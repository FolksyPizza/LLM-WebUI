const authPanel = document.getElementById("authPanel");
const chatPanel = document.getElementById("chatPanel");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignupBtn = document.getElementById("showSignup");
const showLoginBtn = document.getElementById("showLogin");
const chatForm = document.getElementById("chatForm");
const chatBody = document.getElementById("chatBody");
const messagesEl = document.getElementById("messages");
const promptInput = document.getElementById("promptInput");
const sendBtn = document.querySelector(".chat-input button.primary");
const logoutBtn = document.getElementById("logoutBtn");
const greeting = document.getElementById("greeting");
const greetingText = document.getElementById("greetingText");
const userAvatar = document.getElementById("userAvatar");
const userName = document.getElementById("userName");
const userRank = document.getElementById("userRank");
const userMenuBtn = document.getElementById("userMenuBtn");
const userMenu = document.getElementById("userMenu");
const userMenuAvatar = document.getElementById("userMenuAvatar");
const userMenuName = document.getElementById("userMenuName");
const userMenuEmail = document.getElementById("userMenuEmail");
const openSettingsBtn = document.getElementById("openSettings");
const settingsModal = document.getElementById("settingsModal");
const closeSettingsBtn = document.getElementById("closeSettings");
const settingsTabs = document.querySelectorAll(".settings-tab");
const settingsGeneral = document.getElementById("settingsGeneral");
const settingsAccount = document.getElementById("settingsAccount");
const themeSelect = document.getElementById("themeSelect");
const accentButtons = document.querySelectorAll(".accent-option");
const deleteAllChatsBtn = document.getElementById("deleteAllChats");
const archiveAllChatsBtn = document.getElementById("archiveAllChats");
const viewArchivedChatsBtn = document.getElementById("viewArchivedChats");
const deleteAccountBtn = document.getElementById("deleteAccount");
const accountAvatar = document.getElementById("accountAvatar");
const accountName = document.getElementById("accountName");
const accountRank = document.getElementById("accountRank");
const accountEmail = document.getElementById("accountEmail");
const authTopbar = document.getElementById("authTopbar");
const uiBrandMain = document.getElementById("uiBrandMain");
const uiSidebarBrand = document.getElementById("uiSidebarBrand");
const uiLoadingText = document.getElementById("uiLoadingText");
const sidebar = document.getElementById("sidebar");
const appShell = document.getElementById("appShell");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const mobileSidebarBtn = document.getElementById("mobileSidebarBtn");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const newChatBtn = document.getElementById("newChatBtn");
const searchChatsInput = document.getElementById("searchChats");
const chatListEl = document.getElementById("chatList");
const toggleChatsBtn = document.getElementById("toggleChats");
const openSearchBtn = document.getElementById("openSearch");
const searchModal = document.getElementById("searchModal");
const closeSearchBtn = document.getElementById("closeSearch");
const renameModal = document.getElementById("renameModal");
const closeRenameBtn = document.getElementById("closeRename");
const renameInput = document.getElementById("renameInput");
const confirmRenameBtn = document.getElementById("confirmRename");
const tempChatBtn = document.getElementById("tempChatBtn");
const webSearchToggle = document.getElementById("webSearchToggle");
const webSearchStatusText = document.getElementById("webSearchStatusText");
const pythonInterpreterToggle = document.getElementById("pythonInterpreterToggle");
const pythonInterpreterStatusText = document.getElementById("pythonInterpreterStatusText");
const pythonInterpreterToggleRow = document.getElementById("pythonInterpreterToggleRow");
const modelPicker = document.getElementById("modelPicker");
const modelButton = document.getElementById("modelButton");
const modelLabel = document.getElementById("modelLabel");
const modelMenu = document.getElementById("modelMenu");
const modelMenuPrimary = document.getElementById("modelMenuPrimary");
const modelMenuLegacy = document.getElementById("modelMenuLegacy");
const legacyPanel = document.getElementById("legacyPanel");
const modelMenuFooter = document.getElementById("modelMenuFooter");
const archiveModal = document.getElementById("archiveModal");
const closeArchiveBtn = document.getElementById("closeArchive");
const archivedList = document.getElementById("archivedList");
const feedbackModal = document.getElementById("feedbackModal");
const closeFeedbackBtn = document.getElementById("closeFeedback");
const feedbackDetailsInput = document.getElementById("feedbackDetails");
const submitFeedbackBtn = document.getElementById("submitFeedback");
const versionsModal = document.getElementById("versionsModal");
const closeVersionsBtn = document.getElementById("closeVersions");
const versionsList = document.getElementById("versionsList");
const errorOverlay = document.getElementById("appError");
const loadingOverlay = document.getElementById("appLoading");
const errorMessageEl = document.getElementById("errorMessage");
const retryAppBtn = document.getElementById("retryApp");
const actionConfirm = document.getElementById("actionConfirm");
const actionConfirmMessage = document.getElementById("actionConfirmMessage");
const actionConfirmCancel = document.getElementById("actionConfirmCancel");
const actionConfirmApply = document.getElementById("actionConfirmApply");
const appToast = document.getElementById("appToast");

let currentUser = null;
let settings = null;
let greetingTimer = null;
let greetingIndex = 0;
let chats = [];
let activeChatId = null;
let chatsCollapsed = false;
let renamingChatId = null;
let tempChatEnabled = false;
let archivedChats = [];
let selectedModelId = null;
let availableModels = [];
let webSearchEnabled = false;
let pythonInterpreterSiteEnabled = false;
let pythonInterpreterEnabled = false;
let pendingFeedback = null;
let activeStream = null;
let isStreaming = false;
let lastUsedModelId = null;
let activeBotBubble = null;
const limitNoticesShown = new Set();
let codeLineNumbersEnabled = false;
let toastTimer = null;
let confirmAction = null;
let shouldAutoScroll = true;
let chatSyncTimer = null;
let sidebarWasCollapsedBeforeMobile = false;
let activeVersionsBubble = null;
const MOBILE_SIDEBAR_BREAKPOINT = 940;

const greetings = [
  "Good to see you, {FIRST_NAME}.",
  "How can I help, {FIRST_NAME}?",
  "What's on your mind today, {FIRST_NAME}?",
  "What's on the agenda today, {FIRST_NAME}?",
  "What can I help with, {FIRST_NAME}?",
  "Where should we begin, {FIRST_NAME}?",
  "Ready when you are.",
  "Let's get started.",
];

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    ...options,
  });
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json().catch(() => ({})) : {};
  let fallbackText = "";
  if (!isJson) {
    fallbackText = (await response.text().catch(() => "")).trim();
  }
  if (!response.ok) {
    const message =
      data?.error ||
      fallbackText ||
      `${response.status} ${response.statusText || "Request failed"}`;
    throw new Error(message);
  }
  return data;
}

function getFirstName(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "there";
  const first = trimmed.split(/\s+/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function getUserRank(user) {
  if (!user) return "Free";
  if (user.admin) return "Pro";
  return user.rank || "Free";
}

function formatDisplayName(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "User";
  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getInitials(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function formatEmailHandle(email) {
  const value = (email || "").trim();
  if (!value) return "@user";
  const handle = value.split("@")[0];
  const trimmed = handle.length > 12 ? `${handle.slice(0, 12)}...` : handle;
  return `@${trimmed}`;
}

function applyUiBrand(uiName) {
  const brand = (uiName || "").trim() || "LLM WebUI";
  document.title = brand;
  if (uiBrandMain) uiBrandMain.textContent = brand;
  if (uiSidebarBrand) uiSidebarBrand.setAttribute("aria-label", brand);
  if (uiLoadingText) uiLoadingText.textContent = `Loading ${brand}...`;
}

function showAuthForm(mode = "login") {
  loginForm.classList.toggle("show", mode === "login");
  signupForm.classList.toggle("show", mode === "signup");
}

function setupAuthSwitches() {
  showSignupBtn?.addEventListener("click", () => showAuthForm("signup"));
  showLoginBtn?.addEventListener("click", () => showAuthForm("login"));
}

function updateAuthMode(isAuthVisible) {
  document.body.classList.toggle("auth-mode", Boolean(isAuthVisible));
}

const accentOptions = {
  Default: { color: "#2dd4bf", border: "rgba(45, 212, 191, 0.25)", send: null },
  Blue: { color: "#38bdf8", border: "rgba(56, 189, 248, 0.25)", send: null },
  Green: { color: "#22c55e", border: "rgba(34, 197, 94, 0.25)", send: null },
  Yellow: { color: "#fbbf24", border: "rgba(251, 191, 36, 0.25)", send: null },
  Pink: { color: "#f472b6", border: "rgba(244, 114, 182, 0.25)", send: null },
  Orange: { color: "#fb923c", border: "rgba(251, 146, 60, 0.25)", send: null },
  Purple: { color: "#a78bfa", border: "rgba(167, 139, 250, 0.25)", send: null },
};

function applyAccent(name) {
  const option = accentOptions[name] || accentOptions.Default;
  document.documentElement.style.setProperty("--accent", option.color);
  document.documentElement.style.setProperty("--accent-border", option.border);
  localStorage.setItem("lm_accent_name", name);
  accentButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.accent === name);
  });
}

function initializeAppearance() {
  const theme = localStorage.getItem("lm_theme") || "dark";
  const accentName = localStorage.getItem("lm_accent_name") || "Default";
  document.body.dataset.theme = theme;
  themeSelect.value = theme;
  applyAccent(accentName);
  const darkTheme = document.getElementById("hljs-theme-dark");
  const lightTheme = document.getElementById("hljs-theme-light");
  if (darkTheme && lightTheme) {
    if (theme === "light") {
      darkTheme.disabled = true;
      lightTheme.disabled = false;
    } else {
      darkTheme.disabled = false;
      lightTheme.disabled = true;
    }
  }
}

function setAppLoading(active) {
  if (!loadingOverlay) return;
  loadingOverlay.classList.toggle("hidden", !active);
}

function showAppError(message = "Something went wrong") {
  if (!errorOverlay || !errorMessageEl) return;
  errorMessageEl.textContent = message;
  errorOverlay.classList.remove("hidden");
}

function hideAppError() {
  errorOverlay?.classList.add("hidden");
}

function refreshCodeBlockLineNumbers(enabled) {
  document.querySelectorAll(".code-block").forEach((block) => {
    block.classList.toggle("line-numbers", enabled);
  });
}

function setupPasswordToggles() {
  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.textContent = isPassword ? "Hide" : "Show";
    });
  });
}

function updateGreetingVisibility() {
  if (messagesEl.children.length === 0) {
    greeting.classList.remove("hidden");
  } else {
    greeting.classList.add("hidden");
  }
}

function renderTempChatIcon() {
  if (!tempChatBtn) return;
  if (tempChatEnabled) {
    tempChatBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 8.5A2.5 2.5 0 0 1 8.5 6h7A2.5 2.5 0 0 1 18 8.5v4A2.5 2.5 0 0 1 15.5 15H11l-3 2.5V15H8.5A2.5 2.5 0 0 1 6 12.5z" stroke-dasharray="2.2 2.2"></path>
        <path d="M9.6 11.1l1.7 1.7 3-3" />
      </svg>
    `;
  } else {
    tempChatBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 8.5A2.5 2.5 0 0 1 8.5 6h7A2.5 2.5 0 0 1 18 8.5v4A2.5 2.5 0 0 1 15.5 15H11l-3 2.5V15H8.5A2.5 2.5 0 0 1 6 12.5z" stroke-dasharray="2.2 2.2"></path>
      </svg>
    `;
  }
}

function adjustComposerHeight() {
  if (!promptInput) return;
  promptInput.style.height = "auto";
  const nextHeight = Math.min(promptInput.scrollHeight, 96);
  promptInput.style.height = `${Math.max(nextHeight, 24)}px`;
}

function getScrollContainer() {
  return chatBody || messagesEl;
}

function isNearBottom(threshold = 72) {
  const el = getScrollContainer();
  if (!el) return true;
  return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
}

function scrollToLatest(force = false) {
  const el = getScrollContainer();
  if (!el) return;
  if (force || shouldAutoScroll) {
    el.scrollTop = el.scrollHeight;
  }
}

function handleScrollState() {
  shouldAutoScroll = isNearBottom();
}

function showToast(message) {
  if (!appToast || !message) return;
  appToast.textContent = message;
  appToast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    appToast.classList.add("hidden");
  }, 2600);
}

function hideActionConfirm() {
  if (!actionConfirm) return;
  actionConfirm.classList.add("hidden");
  confirmAction = null;
}

function showActionConfirm(anchorEl, message, onConfirm) {
  if (!actionConfirm || !anchorEl) return;
  confirmAction = onConfirm;
  actionConfirmMessage.textContent = message || "Are you sure?";
  actionConfirm.classList.remove("hidden");
  const rect = anchorEl.getBoundingClientRect();
  const popupRect = actionConfirm.getBoundingClientRect();
  const top = Math.min(window.innerHeight - popupRect.height - 8, rect.bottom + 8);
  const left = Math.min(
    window.innerWidth - popupRect.width - 8,
    Math.max(8, rect.left)
  );
  actionConfirm.style.top = `${Math.max(8, top)}px`;
  actionConfirm.style.left = `${left}px`;
}

function escapeHtml(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return text
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
      } catch (err) {
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
    // Break fused heading markers and code-fence markers onto clean lines.
    src = src
      .replace(/([^\n])(?=#{1,6}\s)/g, "$1\n")
      .replace(/([^\n])```/g, "$1\n```")
      .replace(/```([a-zA-Z0-9_+-]+)(?!\r?\n)/g, "```$1\n")
      .replace(/```pytho\s*\n\s*n\b/gi, "```python")
      .replace(/```pyt\s*\n?\s*hon\b/gi, "```python")
      .replace(/```\s*(#{1,6}\s)/g, "```\n$1")
      .replace(/```\s*(\d+\.\s+[A-Z])/g, "```\n$1");
    // Common malformed "Heading...python..." pattern.
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
      // If a heading appears while a fence is open, close the fence first.
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

  let textValue = normalizeMarkdownSource(toText(value));
  if (textValue.includes("\\n") && !textValue.includes("\n")) {
    textValue = textValue.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
  }
  const normalizedValue = textValue;
  const fenceCount = (normalizedValue.match(/```/g) || []).length;
  const safeValue = fenceCount % 2 === 0 ? normalizedValue : `${normalizedValue}\n\`\`\``;
  const spoilerProcessed = safeValue.replace(/\|\|([^|]+)\|\|/g, "<span class=\"spoiler\">$1</span>");
  const alignProcessed = spoilerProcessed
    .replace(/:::center([\s\S]*?):::/g, '<div class="align-center">$1</div>')
    .replace(/:::right([\s\S]*?):::/g, '<div class="align-right">$1</div>');
  if (window.marked && window.DOMPurify) {
    const renderer = new marked.Renderer();
    renderer.code = (code, lang) => {
      const codeText =
        typeof code === "string"
          ? code
          : typeof code?.text === "string"
            ? code.text
            : String(code ?? "");
      const langValue =
        typeof lang === "string"
          ? lang
          : typeof code?.lang === "string"
            ? code.lang
            : "";
      let highlighted = "";
      if (window.hljs) {
        try {
          highlighted = langValue && hljs.getLanguage(langValue)
            ? hljs.highlight(codeText, { language: langValue }).value
            : hljs.highlightAuto(codeText).value;
        } catch (err) {
          highlighted = escapeHtml(codeText);
        }
      } else {
        highlighted = escapeHtml(codeText);
      }
      const lines = highlighted.split(/\n/);
      const numbered = lines
        .map((line, idx) => `<span class="code-line" data-line="${idx + 1}">${line || "&nbsp;"}</span>`)
        .join("\n");
      const label = langValue ? `<div class="code-label">${escapeHtml(langValue)}</div>` : "";
      return `
        <pre class="code-block ${codeLineNumbersEnabled ? "line-numbers" : ""}" data-raw="${encodeURIComponent(codeText)}">
          <button class="code-copy" type="button">Copy</button>
          <code class="language-${escapeHtml(langValue || "")}">${numbered}</code>
          ${label}
        </pre>
      `;
    };
    try {
      const markdownSource =
        typeof alignProcessed === "string" ? alignProcessed : String(alignProcessed ?? "");
      const raw = marked.parse(String(markdownSource || ""), {
        renderer,
        gfm: true,
        breaks: true,
        silent: true,
      });
      return DOMPurify.sanitize(raw, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["target", "rel", "class", "data-line"],
      });
    } catch (err) {
      console.error(err);
      return escapeHtml(String(alignProcessed ?? "")).replace(/\n/g, "<br>");
    }
  }
  return escapeHtml(String(alignProcessed ?? "")).replace(/\n/g, "<br>");
}

function wireCodeBlocks(container) {
  container.querySelectorAll(".code-copy").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "true";
    btn.addEventListener("click", () => {
      const pre = btn.closest("pre");
      if (!pre) return;
      const raw = decodeURIComponent(pre.getAttribute("data-raw") || "");
      navigator.clipboard.writeText(raw).catch(() => {});
    });
  });
}

function renderMath(container) {
  if (window.renderMathInElement) {
    renderMathInElement(container, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
    });
  }
}

async function bootApp() {
  setAppLoading(true);
  hideAppError();
  try {
    await loadMe();
  } catch (err) {
    console.error(err);
    showAppError(err.message || "Unable to load the workspace.");
  } finally {
    setAppLoading(false);
  }
}

function createMessageId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `msg_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function typeGreetingLine(text, onDone) {
  let index = 0;
  greetingText.textContent = "";
  clearInterval(greetingTimer);
  greetingTimer = setInterval(() => {
    greetingText.textContent = text.slice(0, index);
    index += 1;
    if (index > text.length) {
      clearInterval(greetingTimer);
      setTimeout(onDone, 10800);
    }
  }, 85);
}

function startGreetingCycle(name) {
  const firstName = getFirstName(name);
  const nextLine = () => {
    const line = greetings[greetingIndex % greetings.length].replace(
      "{FIRST_NAME}",
      firstName
    );
    greetingIndex += 1;
    typeGreetingLine(line, nextLine);
  };
  nextLine();
}

function appendMessage(text, role, options = {}) {
  const bubble = document.createElement("div");
  bubble.className = `message ${role}`;
  if (role === "bot") {
    bubble.classList.add("line-response");
  }
  const messageId = createMessageId();
  bubble.dataset.messageId = messageId;
  bubble.dataset.rawText = text || "";
  if (typeof options.messageIndex === "number" && Number.isFinite(options.messageIndex)) {
    bubble.dataset.messageIndex = String(options.messageIndex);
  }
  if (role === "bot") {
    bubble.dataset.prompt = String(options.prompt || "");
    const versions = normalizeBotVersions(options.botMessage || { role: "bot", text });
    bubble.dataset.versions = JSON.stringify(versions);
    const currentIndex = getSafeVersionIndex(options.botMessage?.versionIndex, versions.length);
    bubble.dataset.versionIndex = String(currentIndex);
    bubble.dataset.rawText = versions[currentIndex]?.text || text || "";
  }
  const content = document.createElement("div");
  content.className = "message-content";
  if (role === "bot") {
    content.innerHTML = renderMarkdown(bubble.dataset.rawText || text);
    wireCodeBlocks(content);
    renderMath(content);
  } else {
    content.textContent = text;
  }
  bubble.appendChild(content);

  if (role === "bot") {
    addBotActions(bubble, () => bubble.dataset.rawText || "", messageId);
  } else if (role === "user") {
    addUserActions(bubble, () => bubble.dataset.rawText || "");
  }

  messagesEl.appendChild(bubble);
  scrollToLatest();
  updateGreetingVisibility();
  return bubble;
}

function createBotVersion(text, label = "", createdAt = "") {
  return {
    id: createMessageId(),
    label: String(label || "").trim(),
    text: String(text || ""),
    createdAt: String(createdAt || new Date().toISOString()),
  };
}

function getSafeVersionIndex(index, length) {
  if (!Number.isFinite(length) || length <= 0) return 0;
  const parsed = Number.parseInt(index, 10);
  if (!Number.isFinite(parsed)) return length - 1;
  return Math.max(0, Math.min(parsed, length - 1));
}

function normalizeBotVersions(botMessage) {
  const text = String(botMessage?.text || "");
  const raw = Array.isArray(botMessage?.versions) ? botMessage.versions : [];
  const versions = raw
    .map((item, idx) => {
      if (!item || typeof item !== "object") return null;
      const t = String(item.text || "");
      if (!t) return null;
      return {
        id: String(item.id || createMessageId()),
        label: String(item.label || (idx === 0 ? "Original" : `Regeneration ${idx}`)).trim(),
        text: t,
        createdAt: String(item.createdAt || ""),
      };
    })
    .filter(Boolean);
  if (!versions.length && text) {
    versions.push(createBotVersion(text, "Original", botMessage?.createdAt || ""));
  }
  if (!versions.length) {
    versions.push(createBotVersion("", "Original", ""));
  }
  return versions.slice(0, 30);
}

function getBubbleVersions(bubble) {
  try {
    const parsed = JSON.parse(String(bubble?.dataset?.versions || "[]"));
    if (Array.isArray(parsed) && parsed.length) {
      return normalizeBotVersions({ role: "bot", versions: parsed, text: bubble?.dataset?.rawText || "" });
    }
  } catch (_err) {
    // ignore
  }
  return normalizeBotVersions({ role: "bot", text: bubble?.dataset?.rawText || "" });
}

function setBubbleVersions(bubble, versions, selectedIndex) {
  if (!bubble) return;
  const normalized = normalizeBotVersions({ role: "bot", versions, text: bubble.dataset.rawText || "" });
  const index = getSafeVersionIndex(selectedIndex, normalized.length);
  bubble.dataset.versions = JSON.stringify(normalized);
  bubble.dataset.versionIndex = String(index);
  bubble.dataset.rawText = normalized[index]?.text || "";
  const content = bubble.querySelector(".message-content");
  if (content) {
    content.innerHTML = renderMarkdown(bubble.dataset.rawText || "");
    wireCodeBlocks(content);
    renderMath(content);
  }
}

function closeVersionsModal() {
  versionsModal?.classList.add("hidden");
  activeVersionsBubble = null;
}

function applyBubbleVersionSelection(bubble, versionIndex) {
  if (!bubble) return;
  const versions = getBubbleVersions(bubble);
  setBubbleVersions(bubble, versions, versionIndex);
  const chat = getActiveChat();
  const botIndex = parseBubbleMessageIndex(bubble);
  if (chat && botIndex >= 0 && chat.messages[botIndex]?.role === "bot") {
    const target = chat.messages[botIndex];
    target.versions = getBubbleVersions(bubble);
    target.versionIndex = getSafeVersionIndex(versionIndex, target.versions.length);
    target.text = target.versions[target.versionIndex]?.text || target.text || "";
    saveChats();
  }
}

function openVersionsModalForBubble(bubble) {
  if (!versionsModal || !versionsList || !bubble) return;
  const versions = getBubbleVersions(bubble);
  const currentIndex = getSafeVersionIndex(bubble.dataset.versionIndex, versions.length);
  versionsList.innerHTML = "";
  versions.forEach((version, idx) => {
    const li = document.createElement("li");
    li.className = `version-item ${idx === currentIndex ? "active-version" : ""}`;
    const head = document.createElement("div");
    head.className = "version-head";
    const label = document.createElement("span");
    label.className = "version-label";
    label.textContent = version.label || (idx === 0 ? "Original" : `Regeneration ${idx}`);
    const openBtn = document.createElement("button");
    openBtn.className = "ghost tiny";
    openBtn.type = "button";
    openBtn.textContent = idx === currentIndex ? "Viewing" : "View";
    openBtn.disabled = idx === currentIndex;
    openBtn.addEventListener("click", () => {
      applyBubbleVersionSelection(bubble, idx);
      openVersionsModalForBubble(bubble);
    });
    head.appendChild(label);
    head.appendChild(openBtn);
    const preview = document.createElement("div");
    preview.className = "version-preview";
    preview.textContent = version.text || "(empty)";
    li.appendChild(head);
    li.appendChild(preview);
    versionsList.appendChild(li);
  });
  activeVersionsBubble = bubble;
  versionsModal.classList.remove("hidden");
}

function addUserActions(bubble, getText) {
  const actions = document.createElement("div");
  actions.className = "message-actions";

  const copyBtn = document.createElement("button");
  copyBtn.className = "icon-action";
  copyBtn.setAttribute("data-tooltip", "Copy prompt");
  copyBtn.setAttribute("data-tooltip-pos", "top");
  copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <rect x="5" y="5" width="10" height="10" rx="2"></rect>
      </svg>
    `;
  copyBtn.addEventListener("click", async () => {
    const value = getText() || "";
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      const fallback = document.createElement("textarea");
      fallback.value = value;
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.focus();
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
    }
  });

  const editBtn = document.createElement("button");
  editBtn.className = "icon-action";
  editBtn.setAttribute("data-tooltip", "Edit prompt");
  editBtn.setAttribute("data-tooltip-pos", "top");
  editBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
        <path d="M14 6l4 4"></path>
      </svg>
    `;
  editBtn.addEventListener("click", () => {
    const value = getText() || "";
    promptInput.value = value;
    adjustComposerHeight();
    promptInput.focus();
    promptInput.setSelectionRange(value.length, value.length);
  });

  actions.appendChild(copyBtn);
  actions.appendChild(editBtn);
  bubble.appendChild(actions);
}

function addBotActions(bubble, getText, messageId) {
  const actions = document.createElement("div");
  actions.className = "message-actions";

    const copyBtn = document.createElement("button");
    copyBtn.className = "icon-action";
    copyBtn.setAttribute("data-tooltip", "Copy response");
    copyBtn.setAttribute("data-tooltip-pos", "top");
  copyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="9" width="10" height="10" rx="2"></rect>
        <rect x="5" y="5" width="10" height="10" rx="2"></rect>
      </svg>
    `;
    copyBtn.addEventListener("click", async () => {
      const value = getText() || "";
      try {
        await navigator.clipboard.writeText(value);
      } catch (err) {
        const fallback = document.createElement("textarea");
        fallback.value = value;
        fallback.style.position = "fixed";
        fallback.style.opacity = "0";
        document.body.appendChild(fallback);
        fallback.focus();
        fallback.select();
        document.execCommand("copy");
        fallback.remove();
      }
    });

  const upBtn = document.createElement("button");
  upBtn.className = "icon-action";
  upBtn.setAttribute("data-tooltip", "Thumbs up");
  upBtn.setAttribute("data-tooltip-pos", "top");
  upBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 12h-2v8h2z"></path>
        <path d="M8 12h8l2 2v4l-2 2H8z"></path>
        <path d="M8 12l2-6h3v6"></path>
      </svg>
    `;

  const downBtn = document.createElement("button");
  downBtn.className = "icon-action";
  downBtn.setAttribute("data-tooltip", "Thumbs down");
  downBtn.setAttribute("data-tooltip-pos", "top");
  downBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h-2v8h2z"></path>
        <path d="M8 4h8l2 2v4l-2 2H8z"></path>
        <path d="M8 10l2 6h3v-6"></path>
      </svg>
    `;

  const regenBtn = document.createElement("button");
  regenBtn.className = "icon-action";
  regenBtn.setAttribute("data-tooltip", "Regenerate response");
  regenBtn.setAttribute("data-tooltip-pos", "top");
  regenBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 12a8 8 0 1 1-2.3-5.6"></path>
        <path d="M20 4v6h-6"></path>
      </svg>
    `;

  const versionsBtn = document.createElement("button");
  versionsBtn.className = "icon-action";
  versionsBtn.setAttribute("data-tooltip", "View versions");
  versionsBtn.setAttribute("data-tooltip-pos", "top");
  versionsBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a9 9 0 1 1-9 9"></path>
        <path d="M12 7v5l3 2"></path>
      </svg>
    `;

  const submitRating = async (rating, details = "") => {
    try {
      await api("/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          rating,
          details,
          messageId,
          chatId: activeChatId,
          modelId: selectedModelId,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  upBtn.addEventListener("click", () => {
    upBtn.classList.toggle("active", true);
    downBtn.classList.remove("active");
    submitRating("up");
  });

  downBtn.addEventListener("click", () => {
    downBtn.classList.toggle("active", true);
    upBtn.classList.remove("active");
    submitRating("down");
  });

  actions.appendChild(copyBtn);
  actions.appendChild(upBtn);
  actions.appendChild(downBtn);
  actions.appendChild(versionsBtn);
  actions.appendChild(regenBtn);
  bubble.appendChild(actions);

  regenBtn.addEventListener("click", () => {
    regenerateResponseForBubble(bubble);
  });
  versionsBtn.addEventListener("click", () => {
    openVersionsModalForBubble(bubble);
  });
}

function createThinkingBubble() {
  const bubble = document.createElement("div");
  bubble.className = "message bot";
  const messageId = createMessageId();
  bubble.dataset.messageId = messageId;
  bubble.dataset.rawText = "";

  const content = document.createElement("div");
  content.className = "message-content";
  content.innerHTML = `
    <div class="thinking-row">
      <span class="spinner"></span>
      <span class="thinking-text">Thinking</span>
    </div>
  `;
  bubble.appendChild(content);

  const meta = document.createElement("div");
  meta.className = "thought-meta";
  bubble.appendChild(meta);

  addBotActions(bubble, () => bubble.dataset.rawText || "", messageId);

  messagesEl.appendChild(bubble);
  scrollToLatest();
  updateGreetingVisibility();
  return { bubble, messageId, content, details: null, meta };
}

function showLimitBanner(bubble, text) {
  if (!text) return;
  const banner = document.createElement("div");
  banner.className = "limit-banner";
  banner.textContent = text;
  messagesEl.insertBefore(banner, bubble);
}

function addFallbackBadge(bubble, modelName) {
  if (!bubble || !modelName) return;
  let badge = bubble.querySelector(".fallback-badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.className = "fallback-badge";
    bubble.appendChild(badge);
  }
  badge.textContent = `Fallback: ${modelName}`;
}

function applyFallbackModel(usedModelId) {
  if (!usedModelId) return;
  if (selectedModelId !== usedModelId) {
    selectedModelId = usedModelId;
    localStorage.setItem("lm_model_id", usedModelId);
    updateModelLabel(availableModels || []);
  }
}

function handleLimitNotice(meta, bubble) {
  if (!meta) return;
  if (meta.limitedModelName && !limitNoticesShown.has(meta.limitedModelName)) {
    showLimitBanner(bubble, meta.notice);
    limitNoticesShown.add(meta.limitedModelName);
  }
  if (meta.fallbackModelName) {
    addFallbackBadge(bubble, meta.fallbackModelName);
  }
}

function getLastUserPrompt() {
  const chat = getActiveChat();
  if (!chat) return "";
  for (let i = chat.messages.length - 1; i >= 0; i -= 1) {
    if (chat.messages[i].role === "user") {
      return chat.messages[i].text;
    }
  }
  return "";
}

function parseBubbleMessageIndex(bubble) {
  const raw = bubble?.dataset?.messageIndex;
  if (raw === undefined) return -1;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : -1;
}

function findPromptForBotIndex(chat, botIndex) {
  if (!chat || !Array.isArray(chat.messages) || botIndex < 0) return "";
  for (let i = botIndex - 1; i >= 0; i -= 1) {
    if (chat.messages[i]?.role === "user") {
      return chat.messages[i].text || "";
    }
  }
  return "";
}

function resolvePromptForBubble(bubble) {
  const direct = String(bubble?.dataset?.prompt || "").trim();
  if (direct) return direct;
  const chat = getActiveChat();
  const botIndex = parseBubbleMessageIndex(bubble);
  const fromChat = findPromptForBotIndex(chat, botIndex).trim();
  if (fromChat) return fromChat;
  return getLastUserPrompt().trim();
}

function removeLastBotMessage() {
  const chat = getActiveChat();
  if (!chat) return;
  if (chat.messages.length && chat.messages[chat.messages.length - 1].role === "bot") {
    chat.messages.pop();
    saveChats();
  }
  const botBubbles = Array.from(messagesEl.querySelectorAll(".message.bot"));
  if (botBubbles.length) {
    botBubbles[botBubbles.length - 1].remove();
  }
}

function regenerateLastResponse() {
  const prompt = getLastUserPrompt();
  if (!prompt) return;
  removeLastBotMessage();
  sendMessage(prompt, { skipUser: true });
}

async function regenerateResponseForBubble(bubble) {
  if (!bubble || isStreaming) return;
  const prompt = resolvePromptForBubble(bubble);
  if (!prompt) {
    showToast("Could not find the original prompt for this response.");
    return;
  }
  const chat = getActiveChat();
  const botIndex = parseBubbleMessageIndex(bubble);
  const thinkingStart = performance.now();
  const content = bubble.querySelector(".message-content");
  const meta = bubble.querySelector(".thought-meta");
  const details = bubble.querySelector(".thinking-details");
  bubble.dataset.prompt = prompt;
  bubble.dataset.rawText = "";
  bubble.querySelector(".fallback-badge")?.remove();
  if (content) {
    content.innerHTML = `
      <div class="thinking-row">
        <span class="spinner"></span>
        <span class="thinking-text">Thinking</span>
      </div>
    `;
  }
  if (meta) meta.textContent = "";
  if (details) details.textContent = "";

  let promptToSend = prompt;
  let searchNote = "";
  if (webSearchEnabled) {
    try {
      const data = await api(`/api/search?q=${encodeURIComponent(prompt)}`);
      const results = data.results || [];
      if (results.length) {
        const formatted = results
          .map(
            (item, index) =>
              `[${index + 1}] ${item.title}\n${item.body}\n${item.href}`
          )
          .join("\n\n");
        promptToSend = `Use these web results if helpful:\n${formatted}\n\nUser: ${prompt}`;
        searchNote = `Web search used: ${results.length} result(s).`;
      }
    } catch (_err) {
      searchNote = "";
    }
  }

  isStreaming = true;
  activeBotBubble = bubble;
  sendBtn.classList.add("stop");
  renderSendIcon();

  try {
    await sendWithStream(promptToSend, bubble);
  } catch (_err) {
    try {
      const data = await api("/api/infer", {
        method: "POST",
        body: JSON.stringify({ prompt: promptToSend, modelId: selectedModelId }),
      });
      bubble.dataset.rawText = data.text || "";
      if (content) {
        content.innerHTML = renderMarkdown(data.text || "");
        wireCodeBlocks(content);
        renderMath(content);
      }
      if (data.usedModelId) {
        lastUsedModelId = data.usedModelId;
        applyFallbackModel(data.usedModelId);
      }
      handleLimitNotice(
        {
          notice: data.notice,
          limitedModelName: data.limitedModelName,
        },
        bubble
      );
    } catch (fallbackErr) {
      const msg = fallbackErr?.message || "Could not regenerate this response.";
      bubble.dataset.rawText = msg;
      if (content) {
        content.textContent = msg;
      }
      showToast(msg);
    }
  } finally {
    const elapsed = (performance.now() - thinkingStart) / 1000;
    const seconds = elapsed.toFixed(1);
    if (meta) meta.textContent = `Thought for ${seconds}s`;
    if (details) {
      const modelName = availableModels.find((model) => model.id === lastUsedModelId)?.name;
      details.textContent = `Thought for ${seconds}s.${searchNote ? ` ${searchNote}` : ""}${
        modelName ? ` Model: ${modelName}.` : ""
      }`;
    }
    if (chat && !tempChatEnabled && botIndex >= 0 && chat.messages[botIndex]?.role === "bot") {
      const target = chat.messages[botIndex];
      const nextText = bubble.dataset.rawText || "";
      const currentVersions = normalizeBotVersions(target);
      const regenNumber = Math.max(1, currentVersions.length);
      currentVersions.push(createBotVersion(nextText, `Regeneration ${regenNumber}`));
      target.versions = currentVersions;
      target.versionIndex = currentVersions.length - 1;
      target.text = nextText;
      setBubbleVersions(bubble, currentVersions, target.versionIndex);
      saveChats();
    }
    isStreaming = false;
    activeBotBubble = null;
    sendBtn.classList.remove("stop");
    renderSendIcon();
    scrollToLatest(true);
  }
}

function renderSendIcon() {
  if (!sendBtn) return;
  if (sendBtn.classList.contains("stop")) {
    sendBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" rx="2"></rect>
      </svg>
    `;
  } else {
    sendBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V6"></path>
        <path d="M6.5 11.5L12 6l5.5 5.5"></path>
      </svg>
    `;
  }
}

function chatStorageKey() {
  return currentUser ? `lm_chats_${currentUser.id}` : "lm_chats_guest";
}

function archiveStorageKey() {
  return currentUser ? `lm_archives_${currentUser.id}` : "lm_archives_guest";
}

function saveLocalChatBackup() {
  localStorage.setItem(chatStorageKey(), JSON.stringify(chats));
  localStorage.setItem(archiveStorageKey(), JSON.stringify(archivedChats));
}

function scheduleChatSync() {
  saveLocalChatBackup();
  if (!currentUser) return;
  if (chatSyncTimer) clearTimeout(chatSyncTimer);
  chatSyncTimer = setTimeout(async () => {
    try {
      await api("/api/chats", {
        method: "POST",
        body: JSON.stringify({ chats, archivedChats }),
      });
    } catch (err) {
      // Keep local backup; retry on next save.
    }
  }, 220);
}

async function loadChats() {
  if (currentUser) {
    try {
      const data = await api("/api/chats");
      chats = Array.isArray(data?.chats) ? data.chats : [];
      archivedChats = Array.isArray(data?.archivedChats) ? data.archivedChats : [];
      if (!chats.length && !archivedChats.length) {
        const localChats = localStorage.getItem(chatStorageKey());
        const localArchived = localStorage.getItem(archiveStorageKey());
        const parsedChats = localChats ? JSON.parse(localChats) : [];
        const parsedArchived = localArchived ? JSON.parse(localArchived) : [];
        if (parsedChats.length || parsedArchived.length) {
          chats = parsedChats;
          archivedChats = parsedArchived;
          scheduleChatSync();
        }
      }
      saveLocalChatBackup();
    } catch (err) {
      const rawChats = localStorage.getItem(chatStorageKey());
      const rawArchived = localStorage.getItem(archiveStorageKey());
      chats = rawChats ? JSON.parse(rawChats) : [];
      archivedChats = rawArchived ? JSON.parse(rawArchived) : [];
    }
  } else {
    const rawChats = localStorage.getItem(chatStorageKey());
    const rawArchived = localStorage.getItem(archiveStorageKey());
    chats = rawChats ? JSON.parse(rawChats) : [];
    archivedChats = rawArchived ? JSON.parse(rawArchived) : [];
  }

  if (chats.length > 0) {
    activeChatId = chats[0].id;
    renderActiveChat();
  } else {
    activeChatId = null;
    messagesEl.innerHTML = "";
    updateGreetingVisibility();
  }
  renderChatList();
}

function saveChats() {
  scheduleChatSync();
}

function loadArchivedChats() {
  // Chat and archive data are loaded together in loadChats().
}

function saveArchivedChats() {
  scheduleChatSync();
}

function createNewChat() {
  const chat = {
    id: `chat_${Date.now()}`,
    title: "New chat",
    messages: [],
  };
  chats.unshift(chat);
  activeChatId = chat.id;
  saveChats();
  renderChatList();
  renderActiveChat();
}

function setActiveChat(chatId) {
  activeChatId = chatId;
  renderChatList();
  renderActiveChat();
}

function getActiveChat() {
  return chats.find((chat) => chat.id === activeChatId);
}

function renderChatList() {
  const query = (searchChatsInput?.value || "").trim().toLowerCase();
  document.querySelectorAll(".chat-menu-floating").forEach((panel) => panel.remove());
  chatListEl.innerHTML = "";
  const visibleChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(query)
  );
  if (visibleChats.length === 0) {
    const empty = document.createElement("li");
    empty.className = "hint";
    empty.textContent = query ? "No chats match your search." : "No chats yet.";
    chatListEl.appendChild(empty);
    return;
  }
  chatListEl.classList.add("chat-history-container");
  visibleChats.forEach((chat) => {
    const li = document.createElement("li");
    li.className = `chat-item chat-history-btn ${chat.id === activeChatId ? "active" : ""}`;
    const title = document.createElement("span");
    title.className = "title";
    title.textContent = chat.title;
    li.appendChild(title);

    const menu = document.createElement("div");
    menu.className = "menu";
    const menuBtn = document.createElement("button");
    menuBtn.className = "menu-btn";
    menuBtn.setAttribute("aria-label", "Chat options");
    menuBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="5" r="1.5"></circle>
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="12" cy="19" r="1.5"></circle>
      </svg>
    `;

    const panel = document.createElement("div");
    panel.className = "menu-panel chat-menu-floating";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "menu-item delete";
    deleteBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18"></path>
        <path d="M8 6V4h8v2"></path>
        <path d="M6 6l1 14h10l1-14"></path>
      </svg>
      <span>Delete</span>
    `;
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      panel.classList.remove("open");
      deleteChat(chat.id);
    });

    panel.appendChild(deleteBtn);
    const archiveBtn = document.createElement("button");
    archiveBtn.className = "menu-item";
    archiveBtn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7h18"></path>
        <path d="M5 7l1 13h12l1-13"></path>
        <path d="M9 11h6"></path>
      </svg>
      <span>Archive</span>
    `;
    archiveBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      panel.classList.remove("open");
      archiveChat(chat.id);
    });
    panel.appendChild(archiveBtn);
    document.body.appendChild(panel);
    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = panel.classList.contains("open");
      closeAllMenus();
      if (!isOpen) {
        panel.classList.add("open");
        panel.style.left = "0px";
        panel.style.top = "0px";
        panel.style.visibility = "hidden";
        const anchor = menuBtn.getBoundingClientRect();
        const popup = panel.getBoundingClientRect();
        const margin = 8;
        let left = anchor.right - popup.width;
        left = Math.max(margin, Math.min(left, window.innerWidth - popup.width - margin));
        let top = anchor.bottom + 6;
        if (top + popup.height > window.innerHeight - margin) {
          top = Math.max(margin, anchor.top - popup.height - 6);
        }
        panel.style.left = `${left}px`;
        panel.style.top = `${top}px`;
        panel.style.visibility = "visible";
      }
    });

    menu.appendChild(menuBtn);
    li.appendChild(menu);
    li.addEventListener("click", () => {
      setActiveChat(chat.id);
      closeMobileSidebarOnAction();
    });
    chatListEl.appendChild(li);
  });
}

function renderActiveChat() {
  const chat = getActiveChat();
  messagesEl.innerHTML = "";
  if (!chat) {
    updateGreetingVisibility();
    return;
  }
  let lastUserPrompt = "";
  chat.messages.forEach((msg, index) => {
    if (msg.role === "user") {
      lastUserPrompt = msg.text || "";
      appendMessage(msg.text, msg.role, { messageIndex: index });
    } else {
      appendMessage(msg.text, msg.role, {
        messageIndex: index,
        prompt: lastUserPrompt,
        botMessage: msg,
      });
    }
  });
  shouldAutoScroll = true;
  scrollToLatest(true);
  updateGreetingVisibility();
}

function renderArchivedList() {
  archivedList.innerHTML = "";
  if (archivedChats.length === 0) {
    const empty = document.createElement("div");
    empty.className = "hint";
    empty.textContent = "No archived chats.";
    archivedList.appendChild(empty);
    return;
  }
  archivedChats.forEach((chat) => {
    const li = document.createElement("li");
    li.className = "archive-item";
    const title = document.createElement("div");
    title.textContent = chat.title || "Archived chat";
    const actions = document.createElement("div");
    actions.className = "archive-actions";

    const restoreBtn = document.createElement("button");
    restoreBtn.className = "menu-item";
    restoreBtn.textContent = "Recover";
    restoreBtn.addEventListener("click", () => {
      archivedChats = archivedChats.filter((item) => item.id !== chat.id);
      chats.unshift(chat);
      saveChats();
      saveArchivedChats();
      renderArchivedList();
      renderChatList();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "menu-item delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      archivedChats = archivedChats.filter((item) => item.id !== chat.id);
      saveArchivedChats();
      renderArchivedList();
    });

    actions.appendChild(restoreBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(title);
    li.appendChild(actions);
    archivedList.appendChild(li);
  });
}

function deleteChat(chatId) {
  const index = chats.findIndex((chat) => chat.id === chatId);
  if (index === -1) return;
  chats.splice(index, 1);
  if (activeChatId === chatId) {
    activeChatId = chats[0]?.id || null;
  }
  if (activeChatId) {
    renderActiveChat();
  } else {
    messagesEl.innerHTML = "";
    updateGreetingVisibility();
  }
  saveChats();
  renderChatList();
}

function archiveChat(chatId) {
  const index = chats.findIndex((chat) => chat.id === chatId);
  if (index === -1) return;
  const [chat] = chats.splice(index, 1);
  archivedChats.unshift(chat);
  if (activeChatId === chatId) {
    activeChatId = chats[0]?.id || null;
  }
  if (activeChatId) {
    renderActiveChat();
  } else {
    messagesEl.innerHTML = "";
    updateGreetingVisibility();
  }
  saveChats();
  saveArchivedChats();
  renderChatList();
}

function renameChat(chatId) {
  const chat = chats.find((item) => item.id === chatId);
  if (!chat) return;
  renamingChatId = chatId;
  renameInput.value = chat.title;
  renameModal.classList.remove("hidden");
  renameInput.focus();
}

function closeAllMenus() {
  document.querySelectorAll(".menu-panel.open").forEach((panel) => {
    panel.classList.remove("open");
    panel.style.visibility = "";
  });
}

function isMobileViewport() {
  return window.matchMedia(`(max-width: ${MOBILE_SIDEBAR_BREAKPOINT}px)`).matches;
}

function openMobileSidebar() {
  if (!appShell || !sidebar || !isMobileViewport()) return;
  sidebarWasCollapsedBeforeMobile = sidebar.classList.contains("collapsed");
  if (sidebarWasCollapsedBeforeMobile) {
    sidebar.classList.remove("collapsed");
    appShell.classList.remove("sidebar-collapsed");
    if (currentUser) updateUserTooltip(formatDisplayName(currentUser.name));
  }
  appShell.classList.add("mobile-sidebar-open");
  sidebarBackdrop?.classList.remove("hidden");
  mobileSidebarBtn?.setAttribute("aria-expanded", "true");
  document.body.classList.add("no-scroll");
}

function closeMobileSidebar({ restoreDesktopCollapse = false } = {}) {
  if (!appShell) return;
  appShell.classList.remove("mobile-sidebar-open");
  sidebarBackdrop?.classList.add("hidden");
  mobileSidebarBtn?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
  if (
    restoreDesktopCollapse &&
    sidebarWasCollapsedBeforeMobile &&
    sidebar &&
    !isMobileViewport()
  ) {
    sidebar.classList.add("collapsed");
    appShell.classList.add("sidebar-collapsed");
    if (currentUser) updateUserTooltip(formatDisplayName(currentUser.name));
  }
  if (!isMobileViewport()) {
    sidebarWasCollapsedBeforeMobile = false;
  }
}

function closeMobileSidebarOnAction() {
  if (!isMobileViewport()) return;
  closeMobileSidebar({ restoreDesktopCollapse: false });
}

function syncViewportLayout() {
  if (isMobileViewport()) {
    mobileSidebarBtn?.setAttribute("aria-expanded", appShell?.classList.contains("mobile-sidebar-open") ? "true" : "false");
    if (!appShell?.classList.contains("mobile-sidebar-open")) {
      sidebarBackdrop?.classList.add("hidden");
      document.body.classList.remove("no-scroll");
    }
    return;
  }
  closeMobileSidebar({ restoreDesktopCollapse: true });
}

function updateModelStatus() {
  return;
}

function updateWelcome() {
  if (!currentUser) return;
  const displayName = formatDisplayName(currentUser.name);
  userName.textContent = displayName;
  userRank.textContent = currentUser.rank || "Free";
  userAvatar.textContent = getInitials(currentUser.name);
  userMenuAvatar.textContent = getInitials(currentUser.name);
  userMenuName.textContent = displayName;
  userMenuEmail.textContent = formatEmailHandle(currentUser.email);
  accountAvatar.textContent = getInitials(currentUser.name);
  accountName.textContent = displayName;
  accountRank.textContent = currentUser.rank || "Free";
  accountEmail.textContent = currentUser.email || "";
  updateUserTooltip(displayName);
}

function updateUserTooltip(displayName) {
  if (sidebar.classList.contains("collapsed")) {
    userMenuBtn.setAttribute("data-tooltip", displayName);
    userMenuBtn.setAttribute("data-tooltip-pos", "top");
  } else {
    userMenuBtn.removeAttribute("data-tooltip");
  }
}

function initializeModels(models, activeId) {
  const rank = getUserRank(currentUser);
  availableModels = (models || []).filter((model) => {
    const allowed = Array.isArray(model.allowedRanks)
      ? model.allowedRanks
      : ["Free", "Plus", "Pro"];
    return allowed.includes(rank);
  });
  const stored = localStorage.getItem("lm_model_id");
  const availableIds = new Set(availableModels.map((model) => model.id));
  if (stored && availableIds.has(stored)) {
    selectedModelId = stored;
  } else if (activeId && availableIds.has(activeId)) {
    selectedModelId = activeId;
  } else {
    selectedModelId = availableModels?.[0]?.id || null;
  }
  renderModelMenu(availableModels || []);
  updateModelLabel(availableModels || []);
}

function initializeSearchControls() {
  const allowed = settings?.searchAllowedRanks || ["Plus", "Pro"];
  const rank = getUserRank(currentUser);
  const isAllowed = settings?.searchEnabled && allowed.includes(rank);
  if (!webSearchToggle) return;
  webSearchToggle.disabled = !isAllowed;
  webSearchEnabled = isAllowed && (localStorage.getItem("lm_web_search") === "true");
  webSearchToggle.checked = webSearchEnabled;
  if (webSearchStatusText) {
    webSearchStatusText.textContent = isAllowed
      ? webSearchEnabled
        ? "Enabled"
        : "Disabled"
      : "Unavailable for your plan";
  }
}

function initializeInterpreterControls() {
  pythonInterpreterSiteEnabled = Boolean(settings?.pythonInterpreterEnabled);
  pythonInterpreterEnabled =
    pythonInterpreterSiteEnabled && Boolean(currentUser?.pythonInterpreterEnabled);
  if (!pythonInterpreterToggle) return;
  pythonInterpreterToggle.disabled = !pythonInterpreterSiteEnabled;
  pythonInterpreterToggle.checked = pythonInterpreterEnabled;
  if (pythonInterpreterStatusText) {
    pythonInterpreterStatusText.textContent = pythonInterpreterEnabled ? "Enabled" : "Disabled";
  }
  pythonInterpreterToggleRow?.setAttribute(
    "data-disabled",
    pythonInterpreterSiteEnabled ? "false" : "true"
  );
}

function getModelDisplayParts(model) {
  const prefix = (model?.displayNamePrefix || "").trim();
  const suffix = (model?.displayNameSuffix || "").trim();
  if (prefix || suffix) {
    return {
      prefix: prefix || (model?.name || "Model"),
      suffix,
    };
  }
  return {
    prefix: model?.name || "Model",
    suffix: "",
  };
}

function renderModelText(target, modelOrNull, fallbackText = "") {
  if (!target) return;
  target.innerHTML = "";
  if (!modelOrNull) {
    target.textContent = fallbackText;
    return;
  }
  const { prefix, suffix } = getModelDisplayParts(modelOrNull);
  const prefixEl = document.createElement("span");
  prefixEl.className = "model-name-prefix";
  prefixEl.textContent = prefix;
  target.appendChild(prefixEl);
  if (suffix) {
    const suffixEl = document.createElement("span");
    suffixEl.className = "model-name-suffix";
    suffixEl.textContent = suffix;
    target.appendChild(suffixEl);
  }
}

function renderModelMenu(models) {
  if (!modelMenuPrimary || !modelMenuFooter || !modelMenuLegacy) return;
  modelMenuPrimary.innerHTML = "";
  modelMenuLegacy.innerHTML = "";
  modelMenuFooter.innerHTML = "";
  legacyPanel?.classList.add("hidden");

  if (!models.length) {
    const empty = document.createElement("button");
    empty.className = "model-option";
    empty.textContent = "No models available";
    empty.disabled = true;
    modelMenuPrimary.appendChild(empty);
    return;
  }

  const normal = [];
  const legacy = [];
  models.forEach((model) => {
    const kind = (model.modelType || "normal").toLowerCase();
    if (kind === "legacy") legacy.push(model);
    else normal.push(model);
  });

  const mountOption = (container, model) => {
    const option = document.createElement("button");
    option.className = "model-option";
    option.dataset.modelId = model.id;
    const label = document.createElement("span");
    label.className = "model-option-label";
    renderModelText(label, model);
    option.appendChild(label);
    container.appendChild(option);
  };

  const primaryList = normal.length ? normal : models.filter((m) => (m.modelType || "normal").toLowerCase() !== "legacy");
  primaryList.forEach((model) => mountOption(modelMenuPrimary, model));

  if (legacy.length) {
    legacy.forEach((model) => mountOption(modelMenuLegacy, model));
    const trigger = document.createElement("button");
    trigger.className = "model-footer-trigger";
    trigger.textContent = "Legacy Models";
    trigger.type = "button";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      legacyPanel?.classList.toggle("hidden");
    });
    modelMenuFooter.appendChild(trigger);
  }

  modelMenuFooter.classList.toggle("hidden", modelMenuFooter.children.length === 0);
}

function updateModelLabel(models) {
  if (!models.length) {
    renderModelText(modelLabel, null, "No models available");
    return;
  }
  const current = models.find((model) => model.id === selectedModelId);
  if (current) {
    renderModelText(modelLabel, current);
  } else {
    renderModelText(modelLabel, null, "Select model");
  }
}

async function loadMe() {
  try {
    const data = await api("/api/me");
    currentUser = data.user;
    settings = data.settings;
    applyUiBrand(settings?.uiName);
    authPanel.classList.add("hidden");
    chatPanel.classList.remove("hidden");
    updateAuthMode(false);
    if (authTopbar) authTopbar.classList.add("hidden");
    updateWelcome();
    updateGreetingVisibility();
    startGreetingCycle(currentUser.name);
    initializeModels(settings?.models || [], settings?.activeModelId);
    initializeSearchControls();
    initializeInterpreterControls();
    await loadChats();
  } catch (err) {
    applyUiBrand("LLM WebUI");
    authPanel.classList.remove("hidden");
    chatPanel.classList.add("hidden");
    showAuthForm("login");
    updateAuthMode(true);
    if (authTopbar) authTopbar.classList.remove("hidden");
  }
}

async function sendWithStream(prompt, bubble) {
  return new Promise((resolve, reject) => {
    let collected = "";
  const modelParam = selectedModelId
      ? `&modelId=${encodeURIComponent(selectedModelId)}`
      : "";
    const stream = new EventSource(
      `/api/infer/stream?prompt=${encodeURIComponent(prompt)}${modelParam}`
    );
    activeStream = stream;

    stream.onmessage = (event) => {
      const eventData = String(event?.data ?? "");
      if (eventData.startsWith("[META]")) {
        try {
          const meta = JSON.parse(eventData.replace("[META]", "").trim());
          if (meta.usedModelId) {
            lastUsedModelId = meta.usedModelId;
            applyFallbackModel(meta.usedModelId);
          }
          handleLimitNotice(meta, bubble);
        } catch (err) {
          // ignore
        }
        return;
      }
      if (eventData.startsWith("[ERROR]")) {
        const message = eventData.replace("[ERROR]", "").trim() || "Inference failed";
        stream.close();
        const content = bubble.querySelector(".message-content");
        bubble.dataset.rawText = message;
        if (content) content.textContent = message;
        reject(new Error(message));
        return;
      }
      if (eventData === "[DONE]") {
        stream.close();
        resolve(collected);
        return;
      }
      collected += eventData;
      bubble.dataset.rawText = collected;
      const content = bubble.querySelector(".message-content");
      if (content) content.innerHTML = renderMarkdown(collected);
      if (content) {
        wireCodeBlocks(content);
        renderMath(content);
      }
      scrollToLatest();
    };

    stream.onerror = () => {
      stream.close();
      activeStream = null;
      reject(new Error("stream_failed"));
    };
  });
}

async function tryHandleInterpreterPrompt(prompt, options = {}) {
  const trimmed = String(prompt || "").trim();
  const match = trimmed.match(/^\/(?:py|python)\s+([\s\S]+)$/i);
  if (!match) return false;
  const code = match[1] || "";
  if (!pythonInterpreterSiteEnabled) {
    appendMessage("Python interpreter is disabled.", "bot");
    return true;
  }
  if (!pythonInterpreterEnabled) {
    appendMessage("Enable Python interpreter in Settings to use /py.", "bot");
    return true;
  }
  if (!options.skipUser) {
    appendMessage(prompt, "user");
  }
  const thinking = createThinkingBubble();
  const botBubble = thinking.bubble;
  try {
    const result = await api("/api/python/execute", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    const parts = [];
    if (result.stdout) {
      parts.push(`Output:\n\`\`\`text\n${result.stdout}\n\`\`\``);
    }
    if (result.stderr) {
      parts.push(`Errors:\n\`\`\`text\n${result.stderr}\n\`\`\``);
    }
    if (!parts.length) {
      parts.push("Execution finished with no output.");
    }
    const msg = parts.join("\n\n");
    botBubble.dataset.rawText = msg;
    const content = botBubble.querySelector(".message-content");
    if (content) {
      content.innerHTML = renderMarkdown(msg);
      wireCodeBlocks(content);
      renderMath(content);
    }
  } catch (err) {
    const msg = err.message || "Interpreter execution failed.";
    botBubble.dataset.rawText = msg;
    const content = botBubble.querySelector(".message-content");
    if (content) content.textContent = msg;
  } finally {
    activeBotBubble = null;
    scrollToLatest(true);
  }
  return true;
}

async function sendMessage(prompt, options = {}) {
  shouldAutoScroll = true;
  scrollToLatest(true);
  if (await tryHandleInterpreterPrompt(prompt, options)) {
    return;
  }
  if (!selectedModelId && availableModels.length === 0) {
    appendMessage("No models are available for your rank.", "bot");
    return;
  }
  let chat = getActiveChat();
  if (!tempChatEnabled && !chat) {
    createNewChat();
    chat = getActiveChat();
  }
  if (!options.skipUser) {
    appendMessage(prompt, "user");
  }
  const thinking = createThinkingBubble();
  const botBubble = thinking.bubble;
  const thinkingStart = performance.now();
  lastUsedModelId = selectedModelId;
  botBubble.dataset.prompt = prompt;
  activeBotBubble = botBubble;
  if (chat && !tempChatEnabled && !options.skipUser) {
    chat.messages.push({ role: "user", text: prompt });
    if (chat.title === "New chat") {
      const title = prompt.split(/\s+/).slice(0, 6).join(" ");
      chat.title = title || "New chat";
      renderChatList();
    }
    saveChats();
  }
  let promptToSend = prompt;
  let searchNote = "";
  if (webSearchEnabled) {
    try {
      const data = await api(`/api/search?q=${encodeURIComponent(prompt)}`);
      const results = data.results || [];
      if (results.length) {
        const formatted = results
          .map(
            (item, index) =>
              `[${index + 1}] ${item.title}\n${item.body}\n${item.href}`
          )
          .join("\n\n");
        promptToSend = `Use these web results if helpful:\n${formatted}\n\nUser: ${prompt}`;
        searchNote = `Web search used: ${results.length} result(s).`;
      }
    } catch (err) {
      searchNote = "";
      webSearchEnabled = false;
      localStorage.setItem("lm_web_search", "false");
      if (webSearchToggle) {
        webSearchToggle.checked = false;
      }
      if (webSearchStatusText) {
        webSearchStatusText.textContent = "Unavailable for your plan";
      }
    }
  }
  isStreaming = true;
  sendBtn.classList.add("stop");
  renderSendIcon();
  try {
    await sendWithStream(promptToSend, botBubble);
  } catch (err) {
    try {
      const data = await api("/api/infer", {
        method: "POST",
        body: JSON.stringify({ prompt: promptToSend, modelId: selectedModelId }),
      });
      const content = botBubble.querySelector(".message-content");
      botBubble.dataset.rawText = data.text || "";
      content.innerHTML = renderMarkdown(data.text || "");
      wireCodeBlocks(content);
      renderMath(content);
      if (data.usedModelId) lastUsedModelId = data.usedModelId;
      if (data.usedModelId) {
        applyFallbackModel(data.usedModelId);
      }
      handleLimitNotice(
        {
          notice: data.notice,
          limitedModelName: data.limitedModelName,
        },
        botBubble
      );
    } catch (error) {
      const content = botBubble.querySelector(".message-content");
      content.textContent = error.message || "Inference failed";
    }
  }
  const elapsed = (performance.now() - thinkingStart) / 1000;
  const details = botBubble.querySelector(".thinking-details");
  const meta = botBubble.querySelector(".thought-meta");
  const seconds = elapsed.toFixed(1);
  if (meta) {
    meta.textContent = `Thought for ${seconds}s`;
  }
  if (details) {
    const modelName = availableModels.find((model) => model.id === lastUsedModelId)?.name;
    details.textContent = `Thought for ${seconds}s.${searchNote ? ` ${searchNote}` : ""}${
      modelName ? ` Model: ${modelName}.` : ""
    }`;
  }
  if (chat && !tempChatEnabled) {
    const raw = botBubble.dataset.rawText || "";
    const initialVersions = [createBotVersion(raw, "Original")];
    chat.messages.push({
      role: "bot",
      text: raw,
      versions: initialVersions,
      versionIndex: 0,
    });
    botBubble.dataset.messageIndex = String(chat.messages.length - 1);
    setBubbleVersions(botBubble, initialVersions, 0);
    if (chat.title === "New chat") {
      const suggestion = raw
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .slice(0, 6)
        .join(" ");
      if (suggestion) {
        chat.title = suggestion;
        renderChatList();
      }
    }
    saveChats();
  }
  isStreaming = false;
  sendBtn.classList.remove("stop");
  renderSendIcon();
  activeBotBubble = null;
  scrollToLatest(true);
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setAppLoading(true);
  try {
    await api("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
      }),
    });
    await loadMe();
  } catch (err) {
    showToast(err.message || "Login failed");
  }
  finally {
    setAppLoading(false);
  }
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setAppLoading(true);
  try {
    await api("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        name: document.getElementById("signupName").value,
        email: document.getElementById("signupEmail").value,
        password: document.getElementById("signupPassword").value,
      }),
    });
    await loadMe();
  } catch (err) {
    showToast(err.message || "Sign up failed");
  }
  finally {
    setAppLoading(false);
  }
});

logoutBtn.addEventListener("click", async () => {
  closeMobileSidebarOnAction();
  await api("/api/logout", { method: "POST" });
  window.location.href = "/login";
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isStreaming) {
    if (activeStream) {
      activeStream.close();
      activeStream = null;
    }
    isStreaming = false;
    sendBtn.classList.remove("stop");
    renderSendIcon();
    if (activeBotBubble) {
      const chat = getActiveChat();
      const content = activeBotBubble.querySelector(".message-content");
      const partial = (activeBotBubble.dataset.rawText || "").trim();
      const finalText = partial || "Stopped.";
      if (content) {
        if (partial) {
          content.innerHTML = renderMarkdown(partial);
          wireCodeBlocks(content);
          renderMath(content);
        } else {
          content.textContent = finalText;
        }
      }
      const meta = activeBotBubble.querySelector(".thought-meta");
      if (meta) meta.textContent = "Stopped";
      activeBotBubble.dataset.rawText = finalText;
      if (chat && !tempChatEnabled) {
        const existingIndex = parseBubbleMessageIndex(activeBotBubble);
        if (existingIndex >= 0 && chat.messages[existingIndex]?.role === "bot") {
          const target = chat.messages[existingIndex];
          const versions = normalizeBotVersions(target);
          const activeIndex = getSafeVersionIndex(target.versionIndex, versions.length);
          versions[activeIndex] = {
            ...versions[activeIndex],
            text: finalText,
            createdAt: versions[activeIndex]?.createdAt || new Date().toISOString(),
          };
          target.versions = versions;
          target.versionIndex = activeIndex;
          target.text = finalText;
          setBubbleVersions(activeBotBubble, versions, activeIndex);
        } else {
          const versions = [createBotVersion(finalText, "Original")];
          chat.messages.push({
            role: "bot",
            text: finalText,
            versions,
            versionIndex: 0,
          });
          activeBotBubble.dataset.messageIndex = String(chat.messages.length - 1);
          setBubbleVersions(activeBotBubble, versions, 0);
        }
        saveChats();
      }
      activeBotBubble = null;
    }
    return;
  }
  const prompt = promptInput.value.trim();
  if (!prompt) return;
  promptInput.value = "";
  adjustComposerHeight();
  await sendMessage(prompt);
});

promptInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

toggleSidebarBtn.addEventListener("click", () => {
  if (isMobileViewport()) {
    closeMobileSidebarOnAction();
    return;
  }
  sidebar.classList.toggle("collapsed");
  appShell.classList.toggle("sidebar-collapsed");
  toggleSidebarBtn.setAttribute(
    "data-tooltip",
    sidebar.classList.contains("collapsed") ? "Open sidebar" : "Close sidebar"
  );
  toggleSidebarBtn.setAttribute("data-tooltip-pos", "bottom");
  if (currentUser) {
    updateUserTooltip(formatDisplayName(currentUser.name));
  }
});

newChatBtn.addEventListener("click", () => {
  activeChatId = null;
  messagesEl.innerHTML = "";
  updateGreetingVisibility();
  renderChatList();
  closeMobileSidebarOnAction();
});

searchChatsInput.addEventListener("input", renderChatList);

toggleChatsBtn.addEventListener("click", () => {
  chatsCollapsed = !chatsCollapsed;
  chatListEl.classList.toggle("collapsed", chatsCollapsed);
  toggleChatsBtn.classList.toggle("collapsed", chatsCollapsed);
});

openSearchBtn.addEventListener("click", () => {
  searchModal.classList.remove("hidden");
  searchChatsInput.value = "";
  renderChatList();
  searchChatsInput.focus();
  closeMobileSidebarOnAction();
});

closeSearchBtn.addEventListener("click", () => {
  searchModal.classList.add("hidden");
});

searchModal.addEventListener("click", (event) => {
  if (event.target === searchModal) {
    searchModal.classList.add("hidden");
  }
});

confirmRenameBtn.addEventListener("click", () => {
  const chat = chats.find((item) => item.id === renamingChatId);
  if (!chat) return;
  const name = renameInput.value.trim();
  if (!name) return;
  chat.title = name;
  saveChats();
  renderChatList();
  renameModal.classList.add("hidden");
});

renameInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  confirmRenameBtn.click();
});

closeRenameBtn.addEventListener("click", () => {
  renameModal.classList.add("hidden");
});

renameModal.addEventListener("click", (event) => {
  if (event.target === renameModal) {
    renameModal.classList.add("hidden");
  }
});

userMenuBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  userMenu.classList.toggle("open");
});

function openSettingsModal() {
  settingsModal.classList.remove("hidden");
  document.body.classList.add("settings-open");
}

function closeSettingsModal() {
  settingsModal.classList.add("hidden");
  document.body.classList.remove("settings-open");
}

openSettingsBtn.addEventListener("click", () => {
  openSettingsModal();
  userMenu.classList.remove("open");
  closeMobileSidebarOnAction();
});

closeSettingsBtn.addEventListener("click", () => {
  closeSettingsModal();
});

settingsModal.addEventListener("click", (event) => {
  if (event.target === settingsModal) {
    closeSettingsModal();
  }
});

settingsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    settingsTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const key = tab.dataset.tab;
    settingsGeneral.classList.toggle("hidden", key !== "general");
    settingsAccount.classList.toggle("hidden", key !== "account");
  });
});

themeSelect.addEventListener("change", () => {
  const theme = themeSelect.value;
  document.body.dataset.theme = theme;
  localStorage.setItem("lm_theme", theme);
  const darkTheme = document.getElementById("hljs-theme-dark");
  const lightTheme = document.getElementById("hljs-theme-light");
  if (darkTheme && lightTheme) {
    if (theme === "light") {
      darkTheme.disabled = true;
      lightTheme.disabled = false;
    } else {
      darkTheme.disabled = false;
      lightTheme.disabled = true;
    }
  }
});

accentButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyAccent(btn.dataset.accent);
  });
});

deleteAccountBtn.addEventListener("click", () => {
  showActionConfirm(
    deleteAccountBtn,
    "Delete your account? This cannot be undone.",
    async () => {
      try {
        await api("/api/me/delete", { method: "POST" });
        window.location.reload();
      } catch (err) {
        showToast(err.message || "Unable to delete account");
      }
    }
  );
});

deleteAllChatsBtn.addEventListener("click", (event) => {
  showActionConfirm(
    event.currentTarget,
    "Delete all chats? This cannot be undone.",
    () => {
      chats = [];
      activeChatId = null;
      messagesEl.innerHTML = "";
      updateGreetingVisibility();
      saveChats();
      renderChatList();
    }
  );
});

archiveAllChatsBtn.addEventListener("click", (event) => {
  showActionConfirm(event.currentTarget, "Archive all chats?", () => {
    if (chats.length === 0) {
      showToast("No chats to archive.");
      return;
    }
    archivedChats = [...chats, ...archivedChats];
    chats = [];
    activeChatId = null;
    messagesEl.innerHTML = "";
    updateGreetingVisibility();
    saveChats();
    saveArchivedChats();
    renderChatList();
  });
});

viewArchivedChatsBtn.addEventListener("click", () => {
  archiveModal.classList.remove("hidden");
  renderArchivedList();
});

closeArchiveBtn.addEventListener("click", () => {
  archiveModal.classList.add("hidden");
});

archiveModal.addEventListener("click", (event) => {
  if (event.target === archiveModal) {
    archiveModal.classList.add("hidden");
  }
});

closeFeedbackBtn.addEventListener("click", () => {
  feedbackModal.classList.add("hidden");
});

feedbackModal.addEventListener("click", (event) => {
  if (event.target === feedbackModal) {
    feedbackModal.classList.add("hidden");
  }
});

closeVersionsBtn?.addEventListener("click", () => {
  closeVersionsModal();
});

versionsModal?.addEventListener("click", (event) => {
  if (event.target === versionsModal) {
    closeVersionsModal();
  }
});

submitFeedbackBtn.addEventListener("click", async () => {
  if (!pendingFeedback) return;
  const details = feedbackDetailsInput.value.trim();
  try {
    await api("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        rating: pendingFeedback.rating || "note",
        details,
        messageId: pendingFeedback.messageId,
        chatId: activeChatId,
        modelId: selectedModelId,
      }),
    });
  } catch (err) {
    showToast(err.message || "Could not submit feedback");
  }
  feedbackModal.classList.add("hidden");
  pendingFeedback = null;
});

retryAppBtn?.addEventListener("click", () => {
  hideAppError();
  bootApp();
});

modelButton.addEventListener("click", (event) => {
  event.stopPropagation();
  modelPicker.classList.toggle("open");
  legacyPanel?.classList.add("hidden");
});

mobileSidebarBtn?.addEventListener("click", (event) => {
  event.stopPropagation();
  if (appShell.classList.contains("mobile-sidebar-open")) {
    closeMobileSidebar({ restoreDesktopCollapse: false });
  } else {
    openMobileSidebar();
  }
});

sidebarBackdrop?.addEventListener("click", () => {
  closeMobileSidebar({ restoreDesktopCollapse: false });
});

modelMenu.addEventListener("click", (event) => {
  event.stopPropagation();
  const target = event.target.closest(".model-option");
  if (!target) return;
  selectedModelId = target.dataset.modelId || null;
  if (selectedModelId) {
    localStorage.setItem("lm_model_id", selectedModelId);
  }
  updateModelLabel(availableModels || []);
  modelPicker.classList.remove("open");
});

modelMenu?.addEventListener("mouseleave", () => {
  legacyPanel?.classList.add("hidden");
});

tempChatBtn.addEventListener("click", () => {
  tempChatEnabled = !tempChatEnabled;
  renderTempChatIcon();
  tempChatBtn.setAttribute(
    "data-tooltip",
    tempChatEnabled ? "Temporary chat enabled" : "Turn on temporary chat"
  );
  tempChatBtn.setAttribute("data-tooltip-pos", "bottom");
});

webSearchToggle?.addEventListener("change", () => {
  if (webSearchToggle.disabled) return;
  webSearchEnabled = webSearchToggle.checked;
  localStorage.setItem("lm_web_search", webSearchEnabled ? "true" : "false");
  if (webSearchStatusText) {
    webSearchStatusText.textContent = webSearchEnabled ? "Enabled" : "Disabled";
  }
});

pythonInterpreterToggle?.addEventListener("change", async () => {
  if (pythonInterpreterToggle.disabled) {
    pythonInterpreterToggle.checked = false;
    pythonInterpreterEnabled = false;
    if (pythonInterpreterStatusText) {
      pythonInterpreterStatusText.textContent = "Disabled";
    }
    return;
  }
  const nextValue = Boolean(pythonInterpreterToggle.checked);
  try {
    const data = await api("/api/me/preferences", {
      method: "POST",
      body: JSON.stringify({
        pythonInterpreterEnabled: nextValue,
      }),
    });
    if (data?.settings) {
      settings = data.settings;
    }
    currentUser = data.user || currentUser;
    pythonInterpreterSiteEnabled = Boolean(settings?.pythonInterpreterEnabled);
    pythonInterpreterEnabled =
      pythonInterpreterSiteEnabled && Boolean(currentUser?.pythonInterpreterEnabled);
    pythonInterpreterToggle.disabled = !pythonInterpreterSiteEnabled;
    pythonInterpreterToggle.checked = pythonInterpreterEnabled;
    if (pythonInterpreterStatusText) {
      pythonInterpreterStatusText.textContent = pythonInterpreterEnabled ? "Enabled" : "Disabled";
    }
    pythonInterpreterToggleRow?.setAttribute(
      "data-disabled",
      pythonInterpreterSiteEnabled ? "false" : "true"
    );
  } catch (err) {
    pythonInterpreterToggle.checked = pythonInterpreterEnabled;
    if (pythonInterpreterStatusText) {
      pythonInterpreterStatusText.textContent = pythonInterpreterEnabled ? "Enabled" : "Disabled";
    }
    showToast(err.message || "Could not update interpreter setting");
  }
});

promptInput.addEventListener("input", () => {
  if (promptInput.value.trim().length === 0) {
    promptInput.setAttribute("data-empty", "true");
  } else {
    promptInput.removeAttribute("data-empty");
  }
  adjustComposerHeight();
});

sendBtn.addEventListener("mouseenter", () => {
  if (isStreaming) {
    sendBtn.setAttribute("data-tooltip", "Stop");
  } else if (promptInput.value.trim().length === 0) {
    sendBtn.setAttribute("data-tooltip", "Message is empty");
  } else {
    sendBtn.setAttribute("data-tooltip", "Send");
  }
  sendBtn.setAttribute("data-tooltip-pos", "top");
});

toggleSidebarBtn.setAttribute(
  "data-tooltip",
  sidebar.classList.contains("collapsed") ? "Open sidebar" : "Close sidebar"
);

document.addEventListener("click", (event) => {
  if (
    actionConfirm &&
    !actionConfirm.classList.contains("hidden") &&
    !event.target.closest("#actionConfirm")
  ) {
    hideActionConfirm();
  }
  if (
    event.target.closest(".menu-panel") ||
    event.target.closest(".menu-btn") ||
    event.target.closest(".menu-item")
  ) {
    return;
  }
  closeAllMenus();
  userMenu.classList.remove("open");
  modelPicker.classList.remove("open");
});

document.addEventListener(
  "mouseenter",
  (event) => {
    const target = event.target.closest("[data-tooltip]");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const padding = 12;
    const leftSpace = rect.left;
    const rightSpace = window.innerWidth - rect.right;
    if (leftSpace < padding) {
      target.setAttribute("data-tooltip-align", "left");
    } else if (rightSpace < padding) {
      target.setAttribute("data-tooltip-align", "right");
    } else {
      target.setAttribute("data-tooltip-align", "center");
    }
  },
  true
);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (appShell.classList.contains("mobile-sidebar-open")) {
    closeMobileSidebar({ restoreDesktopCollapse: false });
  }
  if (!searchModal.classList.contains("hidden")) searchModal.classList.add("hidden");
  if (!renameModal.classList.contains("hidden")) renameModal.classList.add("hidden");
  if (!settingsModal.classList.contains("hidden")) closeSettingsModal();
  if (!archiveModal.classList.contains("hidden")) archiveModal.classList.add("hidden");
  if (!feedbackModal.classList.contains("hidden")) feedbackModal.classList.add("hidden");
  if (!versionsModal.classList.contains("hidden")) closeVersionsModal();
  hideActionConfirm();
  userMenu.classList.remove("open");
  modelPicker.classList.remove("open");
});

actionConfirmCancel?.addEventListener("click", () => {
  hideActionConfirm();
});

actionConfirmApply?.addEventListener("click", async () => {
  if (!confirmAction) return;
  const handler = confirmAction;
  hideActionConfirm();
  await handler();
});

window.addEventListener("resize", hideActionConfirm);
window.addEventListener("scroll", hideActionConfirm, true);
window.addEventListener("resize", closeAllMenus);
window.addEventListener("scroll", closeAllMenus, true);
window.addEventListener("resize", syncViewportLayout);
getScrollContainer()?.addEventListener("scroll", handleScrollState, { passive: true });

function initApp() {
  try {
    setupAuthSwitches();
    showAuthForm("login");
    updateAuthMode(true);
    setupPasswordToggles();
    initializeAppearance();
    renderTempChatIcon();
    renderSendIcon();
    adjustComposerHeight();
    syncViewportLayout();
    bootApp();
  } catch (err) {
    console.error(err);
    showAppError(err.message || "Initialization failed.");
  }
}

function shouldIgnoreGlobalError(message = "", filename = "", errorObj = null) {
  const text = String(message || errorObj?.message || "").trim().toLowerCase();
  if (!text) return true;
  if (text === "script error." || text === "script error") return true;
  if (text.includes("resizeobserver loop limit exceeded")) return true;
  if (text.includes("networkerror when attempting to fetch resource")) return true;
  const source = String(filename || "").trim();
  if (source && /^https?:\/\//i.test(source) && !source.includes(window.location.host)) {
    return true;
  }
  return false;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

window.addEventListener("load", () => {
  document.querySelectorAll(".message.bot").forEach((bubble) => {
    const content = bubble.querySelector(".message-content");
    if (!content) return;
    const raw = bubble.dataset.rawText || content.textContent || "";
    content.innerHTML = renderMarkdown(raw);
    wireCodeBlocks(content);
    renderMath(content);
  });
});

window.addEventListener("error", (event) => {
  if (shouldIgnoreGlobalError(event.message, event.filename, event.error)) {
    return;
  }
  console.error(event.error || event.message);
  if (event.error?.name === "AbortError") return;
  const detail = event.error?.message || event.message || "Unexpected error occurred.";
  showAppError(detail);
});

window.addEventListener("unhandledrejection", (event) => {
  const reasonText = String(event.reason?.message || event.reason || "").toLowerCase();
  if (shouldIgnoreGlobalError(reasonText, "", event.reason)) {
    return;
  }
  console.error(event.reason);
  if (event.reason?.name === "AbortError") return;
  const detail = event.reason?.message || "Unexpected promise rejection.";
  showAppError(detail);
});

window.addEventListener("beforeunload", () => {
  if (!currentUser) return;
  try {
    navigator.sendBeacon(
      "/api/chats",
      new Blob([JSON.stringify({ chats, archivedChats })], {
        type: "application/json",
      })
    );
  } catch (_err) {
    // Best-effort flush only.
  }
});

document.addEventListener("click", (event) => {
  const spoiler = event.target.closest(".spoiler");
  if (spoiler) {
    spoiler.classList.toggle("revealed");
  }
});
