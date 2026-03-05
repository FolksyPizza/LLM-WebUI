const signInForm = document.getElementById("signInForm");
const createForm = document.getElementById("createForm");
const showCreate = document.getElementById("showCreate");
const showSignIn = document.getElementById("showSignIn");
const authMessage = document.getElementById("authMessage");

async function loadPublicBrand() {
  try {
    const response = await fetch("/api/public-config", { credentials: "same-origin" });
    if (!response.ok) return;
    const data = await response.json().catch(() => ({}));
    const brand = (data.uiName || "").trim() || "LLM WebUI";
    document.title = `${brand} - Sign In`;
  } catch (_err) {
    // Keep default fallback title.
  }
}

function setMode(mode) {
  signInForm.classList.toggle("show", mode === "signin");
  createForm.classList.toggle("show", mode === "create");
  document.querySelector("h1").textContent = mode === "signin" ? "Sign In" : "Create account";
  authMessage.textContent = "";
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

showCreate.addEventListener("click", () => setMode("create"));
showSignIn.addEventListener("click", () => setMode("signin"));

signInForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  authMessage.textContent = "";
  try {
    const identifier = document.getElementById("signinIdentifier").value.trim();
    const password = document.getElementById("signinPassword").value;
    await api("/api/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });
    window.location.href = "/app";
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

createForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  authMessage.textContent = "";
  const password = document.getElementById("createPassword").value;
  const confirm = document.getElementById("createConfirmPassword").value;
  if (password !== confirm) {
    authMessage.textContent = "Passwords do not match";
    return;
  }
  try {
    const name = document.getElementById("createName").value.trim();
    const email = document.getElementById("createEmail").value.trim();
    await api("/api/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    window.location.href = "/app";
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

const queryMode = new URLSearchParams(window.location.search).get("mode");
setMode(queryMode === "create" ? "create" : "signin");
loadPublicBrand();
