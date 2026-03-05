const messagesEl = document.getElementById("messages");
const chatForm = document.getElementById("chatForm");
const promptInput = document.getElementById("promptInput");
const sendBtn = document.getElementById("sendBtn");
const authToast = document.getElementById("authToast");
const greetingEl = document.getElementById("greeting");
const greetingTextEl = document.getElementById("greetingText");
const uiBrandDemo = document.getElementById("uiBrandDemo");
const chatBody = document.getElementById("chatBody");

let activeStream = null;
let greetingTimer = null;
let greetingLoopTimer = null;
let greetingIndex = 0;
let shouldAutoScroll = true;
const greetingLines = [
  "How can I help?",
  "What are you working on?",
  "Need help with code, writing, or ideas?",
  "Ask me anything.",
];

async function loadPublicBrand() {
  try {
    const response = await fetch("/api/public-config", { credentials: "same-origin" });
    if (!response.ok) return;
    const data = await response.json().catch(() => ({}));
    const brand = (data.uiName || "").trim() || "LLM WebUI";
    document.title = brand;
    if (uiBrandDemo) uiBrandDemo.textContent = brand;
  } catch (_err) {
    // Keep default fallback branding.
  }
}

function showToast(message) {
  if (!authToast) return;
  authToast.textContent = message;
  authToast.classList.remove("hidden");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => authToast.classList.add("hidden"), 3000);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMarkdown(value) {
  const toText = (input) => {
    if (input === null || input === undefined) return "";
    if (typeof input === "string") return input;
    if (typeof input === "number" || typeof input === "boolean") return String(input);
    if (typeof input === "object") {
      try {
        return JSON.stringify(input, null, 2);
      } catch (_err) {
        return String(input);
      }
    }
    return String(input);
  };
  const normalizeMarkdownSource = (input) => {
    let src = String(input ?? "").replace(/\r\n?/g, "\n").replace(/\u0000/g, "");
    if (src.includes("\\n") && !src.includes("\n")) {
      src = src.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    }
    src = src
      .replace(/([^\n])(?=#{1,6}\s)/g, "$1\n")
      .replace(/([^\n])```/g, "$1\n```")
      .replace(/```([a-zA-Z0-9_+-]+)(?!\r?\n)/g, "```$1\n")
      .replace(/```pytho\s*\n\s*n\b/gi, "```python")
      .replace(/```pyt\s*\n?\s*hon\b/gi, "```python")
      .replace(/```\s*(#{1,6}\s)/g, "```\n$1")
      .replace(/```\s*(\d+\.\s+[A-Z])/g, "```\n$1");
    src = src.replace(
      /(#{1,6}[^\n]*?)python(?=(?:\s*)(?:def|class|import|from|for|while|if|try|with|print\s*\(|\(|#|[A-Za-z_]))/gi,
      "$1\n```python\n"
    );

    const lines = src.split("\n");
    const out = [];
    let inFence = false;
    let fenceLang = "";
    const isLikelyPythonLine = (line) => {
      const t = String(line || "").trim();
      if (!t) return false;
      if (/^#/.test(t)) return true;
      if (/^(def|class|from|import|for|while|if|elif|else:|try:|except|finally:|with|return|print\s*\(|pass\b|break\b|continue\b)/.test(t)) return true;
      if (/^[A-Za-z_]\w*\s*=\s*.+/.test(t)) return true;
      if (/^[A-Za-z_]\w*\s*\([^)]*\)\s*:/.test(t)) return true;
      return false;
    };
    const isLikelyProseLine = (line) => {
      const t = String(line || "").trim();
      if (!t) return false;
      if (/^#{1,6}\s/.test(t) || /^\d+\.\s+/.test(t) || /^[-*]\s+/.test(t)) return false;
      if (isLikelyPythonLine(t)) return false;
      if (/[`{}[\]();=]/.test(t)) return false;
      const words = t.split(/\s+/).filter(Boolean);
      if (words.length < 6) return false;
      return /^[A-Z]/.test(t) || /[.?!:]$/.test(t);
    };
    for (const line of lines) {
      const trimmed = line.trimStart();
      if (/^```/.test(trimmed)) {
        inFence = !inFence;
        fenceLang = inFence ? trimmed.replace(/^```/, "").trim().toLowerCase() : "";
        out.push(line);
        continue;
      }
      if (
        !inFence &&
        !/^#{1,6}\s/.test(trimmed) &&
        /python(?=(?:\s*)(?:def|class|import|from|for|while|if|try|with|print\s*\(|\(|#))/i.test(trimmed)
      ) {
        const lower = line.toLowerCase();
        const idx = lower.indexOf("python");
        const before = line.slice(0, idx).trimEnd();
        const after = line.slice(idx + 6).trimStart();
        if (before) out.push(before);
        out.push("```python");
        inFence = true;
        fenceLang = "python";
        if (after) out.push(after);
        continue;
      }
      if (!inFence && isLikelyPythonLine(trimmed)) {
        out.push("```python");
        inFence = true;
        fenceLang = "python";
      }
      if (inFence && (/^#{1,6}\s/.test(trimmed) || /^\d+\.\s+/.test(trimmed))) {
        out.push("```");
        inFence = false;
        fenceLang = "";
      }
      let nextLine = line;
      if (
        inFence &&
        fenceLang === "python" &&
        /^\s*[A-Za-z_]\w*\s*\([^)]*\)\s*:\s*(?!\s*(?:#|$))/.test(trimmed) &&
        !/^\s*def\s+/.test(trimmed)
      ) {
        nextLine = line.replace(/^(\s*)([A-Za-z_]\w*\s*\([^)]*\)\s*:)/, "$1def $2");
      }
      if (inFence && fenceLang === "python" && isLikelyProseLine(trimmed)) {
        out.push("```");
        inFence = false;
        fenceLang = "";
      }
      out.push(nextLine);
    }
    if (inFence) out.push("```");
    return out.join("\n");
  };

  const source = normalizeMarkdownSource(toText(value));
  if (window.marked && window.DOMPurify) {
    const renderer = new marked.Renderer();
    renderer.code = (code, lang) => {
      const codeText = typeof code === "string" ? code : String(code?.text ?? code ?? "");
      const langValue = typeof lang === "string" ? lang : String(code?.lang ?? "");
      let highlighted = "";
      if (window.hljs) {
        try {
          highlighted = langValue && hljs.getLanguage(langValue)
            ? hljs.highlight(codeText, { language: langValue }).value
            : hljs.highlightAuto(codeText).value;
        } catch (_err) {
          highlighted = escapeHtml(codeText);
        }
      } else {
        highlighted = escapeHtml(codeText);
      }
      return `<pre><code class="language-${escapeHtml(langValue)}">${highlighted}</code></pre>`;
    };
    try {
      const raw = marked.parse(String(source || ""), {
        renderer,
        gfm: true,
        breaks: true,
        silent: true,
      });
      return DOMPurify.sanitize(raw);
    } catch (_err) {
      return escapeHtml(source).replace(/\n/g, "<br>");
    }
  }
  return escapeHtml(source).replace(/\n/g, "<br>");
}

function renderMath(container) {
  if (!container || !window.renderMathInElement) return;
  renderMathInElement(container, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
    strict: "ignore",
  });
}

function adjustComposerHeight() {
  promptInput.style.height = "auto";
  const nextHeight = Math.min(promptInput.scrollHeight, 160);
  promptInput.style.height = `${Math.max(44, nextHeight)}px`;
}

function updateSendState() {
  sendBtn.disabled = !promptInput.value.trim();
}

function isNearBottom(threshold = 72) {
  const el = chatBody || messagesEl;
  if (!el) return true;
  return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
}

function scrollToLatest(force = false) {
  const el = chatBody || messagesEl;
  if (!el) return;
  if (force || shouldAutoScroll) {
    el.scrollTop = el.scrollHeight;
  }
}

function setGreetingVisible(visible) {
  if (!greetingEl) return;
  greetingEl.classList.toggle("hidden", !visible);
}

function stopGreetingCycle() {
  if (greetingTimer) clearInterval(greetingTimer);
  if (greetingLoopTimer) clearTimeout(greetingLoopTimer);
  greetingTimer = null;
  greetingLoopTimer = null;
}

function typeGreetingLine(line, onDone) {
  if (!greetingTextEl) return;
  let idx = 0;
  greetingTextEl.textContent = "";
  if (greetingTimer) clearInterval(greetingTimer);
  greetingTimer = setInterval(() => {
    greetingTextEl.textContent = line.slice(0, idx);
    idx += 1;
    if (idx > line.length) {
      clearInterval(greetingTimer);
      greetingTimer = null;
      greetingLoopTimer = setTimeout(onDone, 2200);
    }
  }, 52);
}

function startGreetingCycle() {
  if (!greetingEl || !greetingTextEl || messagesEl.children.length > 0) return;
  setGreetingVisible(true);
  const step = () => {
    if (messagesEl.children.length > 0) {
      stopGreetingCycle();
      setGreetingVisible(false);
      return;
    }
    const line = greetingLines[greetingIndex % greetingLines.length];
    greetingIndex += 1;
    typeGreetingLine(line, step);
  };
  step();
}

function updateGreetingVisibility() {
  const hasMessages = messagesEl.children.length > 0;
  if (hasMessages) {
    stopGreetingCycle();
    setGreetingVisible(false);
  } else {
    startGreetingCycle();
  }
}

function appendMessage(role, text) {
  const row = document.createElement("div");
  row.className = `message ${role}`;
  if (role === "bot") {
    row.innerHTML = renderMarkdown(text || "");
    renderMath(row);
  } else {
    row.textContent = text || "";
  }
  messagesEl.appendChild(row);
  scrollToLatest();
  updateGreetingVisibility();
  return row;
}

function setThinkingState(bubble, active) {
  if (!bubble) return;
  if (active) {
    bubble.classList.add("thinking");
    bubble.innerHTML = `
      <div class="thinking-row">
        <span class="spinner"></span>
        <span>Thinking...</span>
      </div>
    `;
    return;
  }
  bubble.classList.remove("thinking");
}

async function sendFallback(prompt, bubble) {
  const response = await fetch("/api/demo/infer", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Unable to generate a response.");
  }
  bubble.innerHTML = renderMarkdown(data.text || "");
  renderMath(bubble);
}

async function sendPrompt(prompt) {
  if (activeStream) {
    activeStream.close();
    activeStream = null;
  }
  appendMessage("user", prompt);
  const botBubble = appendMessage("bot", "");
  setThinkingState(botBubble, true);
  let collected = "";

  await new Promise((resolve, reject) => {
    const stream = new EventSource(`/api/demo/infer/stream?prompt=${encodeURIComponent(prompt)}`);
    activeStream = stream;

    stream.onmessage = (event) => {
      const value = String(event?.data ?? "");
      if (value === "[DONE]") {
        stream.close();
        activeStream = null;
        if (botBubble.classList.contains("thinking")) {
          setThinkingState(botBubble, false);
        }
        resolve();
        return;
      }
      if (value.startsWith("[META]")) {
        return;
      }
      if (value.startsWith("[ERROR]")) {
        stream.close();
        activeStream = null;
        reject(new Error(value.replace("[ERROR]", "").trim() || "Unable to generate a response."));
        return;
      }
      collected += value;
      if (botBubble.classList.contains("thinking")) {
        setThinkingState(botBubble, false);
      }
      botBubble.innerHTML = renderMarkdown(collected);
      renderMath(botBubble);
      scrollToLatest();
    };

    stream.onerror = () => {
      stream.close();
      activeStream = null;
      reject(new Error("STREAM_FALLBACK"));
    };
  }).catch(async (err) => {
    if (err.message === "STREAM_FALLBACK") {
      setThinkingState(botBubble, false);
      await sendFallback(prompt, botBubble);
      return;
    }
    throw err;
  });
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) return;
  shouldAutoScroll = true;
  scrollToLatest(true);
  promptInput.value = "";
  adjustComposerHeight();
  updateSendState();
  sendBtn.disabled = true;
  try {
    await sendPrompt(prompt);
  } catch (err) {
    appendMessage("bot", err.message);
    showToast("Sign in to continue.");
  } finally {
    updateSendState();
  }
});

promptInput.addEventListener("input", () => {
  adjustComposerHeight();
  updateSendState();
});

promptInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

adjustComposerHeight();
updateSendState();
updateGreetingVisibility();
loadPublicBrand();
(chatBody || messagesEl)?.addEventListener("scroll", () => {
  shouldAutoScroll = isNearBottom();
}, { passive: true });
