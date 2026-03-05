const authPanel = document.getElementById("authPanel");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const userList = document.getElementById("userList");
const createUserForm = document.getElementById("createUserForm");
const refreshUsersBtn = document.getElementById("refreshUsers");
const adminWelcome = document.getElementById("adminWelcome");
const adminBrandName = document.getElementById("adminBrandName");
const adminHeroTitle = document.getElementById("adminHeroTitle");
const modelHint = document.getElementById("modelHint");
const modelList = document.getElementById("modelList");
const modelForm = document.getElementById("modelForm");
const refreshModelsBtn = document.getElementById("refreshModels");
const modelFormStatus = document.getElementById("modelFormStatus");
const resetModelFormBtn = document.getElementById("resetModelForm");
const clearModelCacheBtn = document.getElementById("clearModelCache");
const displayNamePrefixInput = document.getElementById("displayNamePrefix");
const displayNameSuffixInput = document.getElementById("displayNameSuffix");
const modelProvider = document.getElementById("modelProvider");
const modelTypeSelect = document.getElementById("modelType");
const ollamaModelInput = document.getElementById("ollamaModel");
const openaiBaseUrlInput = document.getElementById("openaiBaseUrl");
const openaiApiKeyInput = document.getElementById("openaiApiKey");
const openaiModelNameInput = document.getElementById("openaiModelName");
const anthropicBaseUrlInput = document.getElementById("anthropicBaseUrl");
const anthropicApiKeyInput = document.getElementById("anthropicApiKey");
const anthropicModelNameInput = document.getElementById("anthropicModelName");
const googleBaseUrlInput = document.getElementById("googleBaseUrl");
const googleApiKeyInput = document.getElementById("googleApiKey");
const googleModelNameInput = document.getElementById("googleModelName");
const openaiBaseUrlGroup = document.getElementById("openaiBaseUrlGroup");
const openaiApiKeyGroup = document.getElementById("openaiApiKeyGroup");
const openaiModelGroup = document.getElementById("openaiModelGroup");
const anthropicBaseUrlGroup = document.getElementById("anthropicBaseUrlGroup");
const anthropicApiKeyGroup = document.getElementById("anthropicApiKeyGroup");
const anthropicModelGroup = document.getElementById("anthropicModelGroup");
const googleBaseUrlGroup = document.getElementById("googleBaseUrlGroup");
const googleApiKeyGroup = document.getElementById("googleApiKeyGroup");
const googleModelGroup = document.getElementById("googleModelGroup");
const systemPromptInput = document.getElementById("systemPrompt");
const rankAccessContainer = document.getElementById("modelRankAccess");
const serverList = document.getElementById("ollamaServerList");
const serverForm = document.getElementById("ollamaServerForm");
const serverNameInput = document.getElementById("serverName");
const serverUrlInput = document.getElementById("serverUrl");
const serverDescriptionInput = document.getElementById("serverDescription");
const serverDefaultInput = document.getElementById("serverDefault");
const resetServerFormBtn = document.getElementById("resetServerForm");
const refreshServersBtn = document.getElementById("refreshServers");
const searchForm = document.getElementById("searchForm");
const searchEnabledInput = document.getElementById("searchEnabled");
const searchMaxResultsInput = document.getElementById("searchMaxResults");
const pythonInterpreterEnabledInput = document.getElementById("pythonInterpreterEnabled");
const pythonInterpreterTimeoutSecInput = document.getElementById("pythonInterpreterTimeoutSec");
const pythonInterpreterMaxOutputCharsInput = document.getElementById("pythonInterpreterMaxOutputChars");
const demoModelIdInput = document.getElementById("demoModelId");
const defaultModelIdInput = document.getElementById("defaultModelId");
const uiNameInput = document.getElementById("uiName");
const apiKeysForm = document.getElementById("apiKeysForm");
const providerKeyOpenAIInput = document.getElementById("providerKeyOpenAI");
const providerKeyAnthropicInput = document.getElementById("providerKeyAnthropic");
const providerKeyGoogleInput = document.getElementById("providerKeyGoogle");
const securityForm = document.getElementById("securityForm");
const securityGuardEnabledInput = document.getElementById("securityGuardEnabled");
const securityGuardPromptInput = document.getElementById("securityGuardPrompt");
const editableFileSelect = document.getElementById("editableFileSelect");
const editableFileContent = document.getElementById("editableFileContent");
const reloadEditableFileBtn = document.getElementById("reloadEditableFile");
const saveEditableFileBtn = document.getElementById("saveEditableFile");
const editableFileStatus = document.getElementById("editableFileStatus");
const refreshFeedbackBtn = document.getElementById("refreshFeedback");
const feedbackList = document.getElementById("feedbackList");
const ollamaServerGroup = document.getElementById("ollamaServerGroup");
const modelServerSelect = document.getElementById("modelServerSelect");
const providerModelLookup = document.getElementById("providerModelLookup");
const fetchProviderModelsBtn = document.getElementById("fetchProviderModels");
const providerModelSelect = document.getElementById("providerModelSelect");
const modelLimitFreeInput = document.getElementById("modelLimitFree");
const modelLimitPlusInput = document.getElementById("modelLimitPlus");
const modelLimitProInput = document.getElementById("modelLimitPro");
const modelPresetInput = document.getElementById("modelPreset");
const modelAlwaysAvailableInput = document.getElementById("modelAlwaysAvailable");
const rankLimitsForm = document.getElementById("rankLimitsForm");
const limitFreeInput = document.getElementById("limitFree");
const limitPlusInput = document.getElementById("limitPlus");
const limitProInput = document.getElementById("limitPro");
const limitFreeTokensInput = document.getElementById("limitFreeTokens");
const limitPlusTokensInput = document.getElementById("limitPlusTokens");
const limitProTokensInput = document.getElementById("limitProTokens");
const demotionModelFreeInput = document.getElementById("demotionModelFree");
const demotionModelPlusInput = document.getElementById("demotionModelPlus");
const demotionModelProInput = document.getElementById("demotionModelPro");
const demotionModelDemoInput = document.getElementById("demotionModelDemo");
const rawSettingsInput = document.getElementById("rawSettingsJson");
const reloadRawSettingsBtn = document.getElementById("reloadRawSettings");
const saveRawSettingsBtn = document.getElementById("saveRawSettings");
const rawSettingsStatus = document.getElementById("rawSettingsStatus");
const statUsers = document.getElementById("statUsers");
const statAdmins = document.getElementById("statAdmins");
const statDisabled = document.getElementById("statDisabled");
const statModels = document.getElementById("statModels");
const userChatsModal = document.getElementById("userChatsModal");
const closeUserChatsBtn = document.getElementById("closeUserChats");
const userChatsTitle = document.getElementById("userChatsTitle");
const userChatsContent = document.getElementById("userChatsContent");
const remoteServerSelect = document.getElementById("remoteServerSelect");
const remoteSearchInput = document.getElementById("remoteSearch");
const refreshRemoteModelsBtn = document.getElementById("refreshRemoteModels");
const installedModelList = document.getElementById("installedModelList");
const availableModelList = document.getElementById("availableModelList");

let currentUser = null;
let settings = null;
let models = [];
let activeModelId = null;
let editingModelId = null;
let usersCache = [];
let systemSettings = null;
let ollamaServers = [];
let defaultServerId = null;
let editingServerId = null;
let installedModels = [];
let availableTags = [];
let remoteFilter = "";
let remoteLoading = false;
let editableFiles = [];
let activeEditableFile = "";
let providerModelOptions = [];
let providerModelsLoading = false;

function setRawSettingsStatus(message, isError = false) {
  if (!rawSettingsStatus) return;
  rawSettingsStatus.textContent = message;
  rawSettingsStatus.style.color = isError ? "var(--danger)" : "";
}

function setEditableFileStatus(message, isError = false) {
  if (!editableFileStatus) return;
  editableFileStatus.textContent = message || "";
  editableFileStatus.style.color = isError ? "var(--danger)" : "";
}

function parseIntegerInput(value) {
  const cleaned = String(value ?? "").replace(/,/g, "").trim();
  if (!cleaned) return null;
  const num = Number(cleaned);
  if (!Number.isFinite(num)) return null;
  const normalized = Math.trunc(num);
  return normalized > 0 ? normalized : null;
}

function formatIntegerInput(input) {
  if (!input) return;
  const parsed = parseIntegerInput(input.value);
  input.value = parsed == null ? "" : parsed.toLocaleString("en-US");
}

function bindIntegerFormatting(input) {
  if (!input) return;
  input.addEventListener("focus", () => {
    input.value = String(input.value || "").replace(/,/g, "");
  });
  input.addEventListener("blur", () => formatIntegerInput(input));
}

function setupIntegerFormatting() {
  [
    document.getElementById("maxNewTokens"),
    modelLimitFreeInput,
    modelLimitPlusInput,
    modelLimitProInput,
    limitFreeInput,
    limitFreeTokensInput,
    limitPlusInput,
    limitPlusTokensInput,
    limitProInput,
    limitProTokensInput,
    pythonInterpreterMaxOutputCharsInput,
  ].forEach(bindIntegerFormatting);
}

const MODEL_PRESETS = {
  focused: { maxNewTokens: 4096, temperature: 0.45, topP: 0.88 },
  balanced: { maxNewTokens: 4096, temperature: 0.7, topP: 0.9 },
  creative: { maxNewTokens: 4096, temperature: 1.0, topP: 0.98 },
  deterministic: { maxNewTokens: 4096, temperature: 0.2, topP: 0.8 },
};

function applyAdminBrand(uiName) {
  const brand = (uiName || "").trim() || "LLM WebUI";
  document.title = `${brand} Admin`;
  if (adminBrandName) adminBrandName.textContent = brand;
  if (adminHeroTitle) adminHeroTitle.textContent = `${brand} Control Center`;
}

function detectModelPreset(values) {
  const tokens = parseIntegerInput(values.maxNewTokens);
  const temperature = Number(values.temperature);
  const topP = Number(values.topP);
  for (const [key, preset] of Object.entries(MODEL_PRESETS)) {
    if (
      tokens === Number(preset.maxNewTokens) &&
      Math.abs(temperature - Number(preset.temperature)) < 0.0001 &&
      Math.abs(topP - Number(preset.topP)) < 0.0001
    ) {
      return key;
    }
  }
  return "custom";
}

function applyModelPreset(presetKey) {
  const preset = MODEL_PRESETS[presetKey];
  if (!preset) return;
  document.getElementById("maxNewTokens").value = preset.maxNewTokens;
  formatIntegerInput(document.getElementById("maxNewTokens"));
  document.getElementById("temperature").value = preset.temperature;
  document.getElementById("topP").value = preset.topP;
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
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

function closeUserChatsModal() {
  if (!userChatsModal) return;
  userChatsModal.classList.add("hidden");
}

function openUserChatsModal() {
  if (!userChatsModal) return;
  userChatsModal.classList.remove("hidden");
}

function renderUserChats(payload) {
  if (!userChatsContent) return;
  const user = payload?.user || {};
  const activeChats = Array.isArray(payload?.chats) ? payload.chats : [];
  const archived = Array.isArray(payload?.archivedChats) ? payload.archivedChats : [];
  if (userChatsTitle) {
    userChatsTitle.textContent = `Chats: ${user.name || user.email || "User"}`;
  }
  userChatsContent.innerHTML = "";
  const all = [
    ...activeChats.map((chat) => ({ ...chat, archived: false })),
    ...archived.map((chat) => ({ ...chat, archived: true })),
  ];
  if (!all.length) {
    const empty = document.createElement("div");
    empty.className = "hint";
    empty.textContent = "No chats stored for this user.";
    userChatsContent.appendChild(empty);
    return;
  }
  all.forEach((chat) => {
    const card = document.createElement("article");
    card.className = "chat-record";
    const title = document.createElement("h4");
    title.textContent = chat.title || "Untitled chat";
    const meta = document.createElement("div");
    meta.className = "meta";
    const messageCount = Array.isArray(chat.messages) ? chat.messages.length : 0;
    meta.textContent = `${chat.archived ? "Archived" : "Active"} • ${messageCount} message(s)`;
    card.appendChild(title);
    card.appendChild(meta);
    (chat.messages || []).forEach((msg) => {
      const line = document.createElement("div");
      line.className = "msg";
      const role = msg.role === "bot" ? "Assistant" : "User";
      line.textContent = `${role}: ${msg.text || ""}`;
      card.appendChild(line);
    });
    userChatsContent.appendChild(card);
  });
}

async function openUserChats(user) {
  if (!user) return;
  try {
    const payload = await api(`/api/users/${user.id}/chats`);
    renderUserChats(payload);
    openUserChatsModal();
  } catch (err) {
    alert(err.message);
  }
}

function renderUsers(users) {
  userList.innerHTML = "";
  usersCache = users;
  updateStats();
  users.forEach((user) => {
    const li = document.createElement("li");
    li.className = "user-card";
    const metaLine = document.createElement("div");
    metaLine.className = "meta";
    metaLine.textContent = `${user.admin ? "Admin" : "User"} - ${
      user.enabled ? "Enabled" : "Disabled"
    }`;
    const nameEl = document.createElement("strong");
    nameEl.textContent = user.name || "";
    const emailEl = document.createElement("span");
    emailEl.textContent = user.email || "";
    li.appendChild(metaLine);
    li.appendChild(nameEl);
    li.appendChild(emailEl);

    const toggleEnable = document.createElement("button");
    toggleEnable.className = "ghost tiny";
    toggleEnable.textContent = user.enabled ? "Disable" : "Enable";
    toggleEnable.disabled = user.admin;
    toggleEnable.addEventListener("click", async () => {
      const label = user.enabled ? "disable" : "enable";
      if (!window.confirm(`Are you sure you want to ${label} this user?`)) return;
      try {
        await api(`/api/users/${user.id}/toggle`, { method: "POST" });
        if (currentUser && user.id === currentUser.id && user.enabled) {
          window.location.reload();
          return;
        }
        await loadUsers();
      } catch (err) {
        alert(err.message);
      }
    });

    const toggleAdmin = document.createElement("button");
    toggleAdmin.className = "ghost tiny";
    toggleAdmin.textContent = user.admin ? "Remove Admin" : "Make Admin";
    toggleAdmin.disabled = user.admin;
    toggleAdmin.addEventListener("click", async () => {
      const label = user.admin ? "remove admin access from" : "grant admin access to";
      if (!window.confirm(`Are you sure you want to ${label} this user?`)) return;
      try {
        await api(`/api/users/${user.id}/admin`, { method: "POST" });
        await loadUsers();
      } catch (err) {
        alert(err.message);
      }
    });

    const deleteUser = document.createElement("button");
    deleteUser.className = "ghost tiny";
    deleteUser.textContent = "Delete";
    deleteUser.addEventListener("click", async () => {
      if (!window.confirm("Delete this user? This cannot be undone.")) return;
      try {
        await api(`/api/users/${user.id}`, { method: "DELETE" });
        await loadUsers();
      } catch (err) {
        alert(err.message);
      }
    });

    const viewChatsBtn = document.createElement("button");
    viewChatsBtn.className = "ghost tiny";
    viewChatsBtn.textContent = "View Chats";
    viewChatsBtn.addEventListener("click", () => {
      openUserChats(user);
    });

    li.appendChild(toggleEnable);
    li.appendChild(toggleAdmin);
    li.appendChild(deleteUser);
    li.appendChild(viewChatsBtn);

    const rankSelect = document.createElement("select");
    ["Free", "Plus", "Pro"].forEach((rank) => {
      const opt = document.createElement("option");
      opt.value = rank;
      opt.textContent = rank;
      if ((user.rank || "Free") === rank) opt.selected = true;
      rankSelect.appendChild(opt);
    });
    if (user.admin) {
      rankSelect.value = "Pro";
      rankSelect.disabled = true;
    }
    rankSelect.addEventListener("change", async () => {
      try {
        await api(`/api/users/${user.id}/rank`, {
          method: "POST",
          body: JSON.stringify({ rank: rankSelect.value }),
        });
        await loadUsers();
      } catch (err) {
        alert(err.message);
      }
    });
    li.appendChild(rankSelect);
    userList.appendChild(li);
  });
}

async function loadUsers() {
  const data = await api("/api/users");
  renderUsers(data.users || []);
}

function updateStats() {
  if (statUsers) statUsers.textContent = usersCache.length.toString();
  if (statAdmins)
    statAdmins.textContent = usersCache.filter((user) => user.admin).length.toString();
  if (statDisabled)
    statDisabled.textContent = usersCache.filter((user) => !user.enabled).length.toString();
  if (statModels) statModels.textContent = models.length.toString();
}

function updateModelHint() {
  if (!modelHint) return;
  const active = models.find((model) => model.id === activeModelId);
  if (!active) {
    modelHint.textContent = "No active model selected.";
    return;
  }
  const cache = active.cache || {};
  const cacheStatus = cache.error
    ? `Error: ${cache.error}`
    : cache.kind
      ? `Loaded (${cache.kind})`
      : "Not loaded yet";
  const providerDetail =
    active.provider === "ollama"
      ? `Ollama: ${active.ollamaModel || "Unset"}`
      : active.provider === "openai"
        ? `OpenAI/vLLM: ${active.openaiModel || "Unset"} @ ${active.openaiBaseUrl || "Unset"}`
        : active.provider === "anthropic"
          ? `Anthropic: ${active.anthropicModel || "Unset"} @ ${
              active.anthropicBaseUrl || "https://api.anthropic.com/v1"
            }`
          : active.provider === "google"
            ? `Google: ${active.googleModel || "Unset"} @ ${
                active.googleBaseUrl || "https://generativelanguage.googleapis.com/v1beta"
              }`
      : `Local: ${active.path || "Not set"}`;
  modelHint.textContent = `Active model: ${active.name} • ${providerDetail} • ${cacheStatus}`;
}

function setRemoteLoading(active) {
  remoteLoading = active;
  if (refreshRemoteModelsBtn) refreshRemoteModelsBtn.disabled = active;
}

function updateRemoteServerOptions() {
  if (!remoteServerSelect) return;
  remoteServerSelect.innerHTML = "";
  if (!ollamaServers.length) {
    const opt = document.createElement("option");
    opt.textContent = "No servers configured";
    opt.value = "";
    remoteServerSelect.appendChild(opt);
    remoteServerSelect.disabled = true;
    return;
  }
  const defaultOpt = document.createElement("option");
  defaultOpt.textContent = "Select server";
  defaultOpt.value = "";
  remoteServerSelect.appendChild(defaultOpt);
  ollamaServers.forEach((server) => {
    const option = document.createElement("option");
    option.value = server.id;
    option.textContent = server.name || server.url;
    remoteServerSelect.appendChild(option);
  });
  remoteServerSelect.disabled = false;
  if (!remoteServerSelect.value) {
    remoteServerSelect.value = defaultServerId || ollamaServers[0].id;
  }
}

function renderRemoteLists() {
  if (remoteSearchInput) {
    remoteFilter = remoteSearchInput.value.trim().toLowerCase();
  }
  if (!installedModelList) return;
  installedModelList.innerHTML = "";
  const installed = installedModels.slice();
  if (!installed.length) {
    const empty = document.createElement("li");
    empty.className = "hint";
    empty.textContent = "No models installed on this server.";
    installedModelList.appendChild(empty);
  } else {
    installed
      .filter((model) => {
        const text = `${model.model || model.name || model.tag}`.toLowerCase();
        return text.includes(remoteFilter);
      })
      .forEach((model) => {
        const title = model.model || model.name || model.tag || "Unnamed";
        const li = document.createElement("li");
        const meta = document.createElement("div");
        const metaTitle = document.createElement("strong");
        metaTitle.textContent = title;
        const metaState = document.createElement("small");
        metaState.textContent = model.status || model.state || "";
        meta.appendChild(metaTitle);
        meta.appendChild(metaState);
        li.appendChild(meta);
        if (model.size) {
          const sizeLabel = document.createElement("div");
          sizeLabel.className = "hint";
          sizeLabel.textContent = `Size: ${model.size}`;
          li.appendChild(sizeLabel);
        }
        const actions = document.createElement("div");
        actions.className = "remote-actions";
        const removeBtn = document.createElement("button");
        removeBtn.className = "ghost tiny";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", async () => {
          if (!remoteServerSelect) return;
          if (!window.confirm(`Uninstall ${title}?`)) return;
          await removeRemoteModel(title);
        });
        actions.appendChild(removeBtn);
        li.appendChild(actions);
        installedModelList.appendChild(li);
      });
  }

  if (!availableModelList) return;
  availableModelList.innerHTML = "";
  if (!availableTags.length) {
    const empty = document.createElement("li");
    empty.className = "hint";
    empty.textContent = "No available models reported by server.";
    availableModelList.appendChild(empty);
  } else {
    availableTags
      .filter((tag) => {
        const text = `${tag.name || tag.tag || tag.model}`.toLowerCase();
        return text.includes(remoteFilter);
      })
      .forEach((tag) => {
        const title = tag.name || tag.tag || tag.model || "Unnamed";
        const li = document.createElement("li");
        const meta = document.createElement("div");
        const metaTitle = document.createElement("strong");
        metaTitle.textContent = title;
        const metaVersion = document.createElement("small");
        metaVersion.textContent = tag.version || tag.model || "";
        meta.appendChild(metaTitle);
        meta.appendChild(metaVersion);
        li.appendChild(meta);
        if (tag.size) {
          const sizeLabel = document.createElement("div");
          sizeLabel.className = "hint";
          sizeLabel.textContent = `Size: ${tag.size}`;
          li.appendChild(sizeLabel);
        }
        if (tag.description) {
          const desc = document.createElement("div");
          desc.className = "hint";
          desc.textContent = tag.description;
          li.appendChild(desc);
        }
        const actions = document.createElement("div");
        actions.className = "remote-actions";
        const downloadBtn = document.createElement("button");
        downloadBtn.className = "primary tiny";
        downloadBtn.textContent = "Download";
        downloadBtn.addEventListener("click", () => {
          downloadRemoteModel(title);
        });
        actions.appendChild(downloadBtn);
        li.appendChild(actions);
        availableModelList.appendChild(li);
      });
  }
}

async function loadRemoteModels(serverId) {
  if (!serverId) return;
  setRemoteLoading(true);
  try {
    const modelsData = await api(`/api/ollama-servers/${serverId}/models`);
    installedModels = modelsData.models || [];
    renderRemoteLists();
    const tagsData = await api(`/api/ollama-servers/${serverId}/tags`);
    availableTags = tagsData.tags || [];
    renderRemoteLists();
  } catch (err) {
    alert(err.message);
  } finally {
    setRemoteLoading(false);
  }
}

async function downloadRemoteModel(modelName) {
  if (!remoteServerSelect || !modelName) return;
  const serverId = remoteServerSelect.value || defaultServerId;
  if (!serverId) return;
  try {
    await api(`/api/ollama-servers/${serverId}/models`, {
      method: "POST",
      body: JSON.stringify({ model: modelName }),
    });
    await loadRemoteModels(serverId);
  } catch (err) {
    alert(err.message);
  }
}

async function removeRemoteModel(modelName) {
  if (!remoteServerSelect || !modelName) return;
  const serverId = remoteServerSelect.value || defaultServerId;
  if (!serverId) return;
  try {
    await api(`/api/ollama-servers/${serverId}/models/${encodeURIComponent(modelName)}`, {
      method: "DELETE",
    });
    await loadRemoteModels(serverId);
  } catch (err) {
    alert(err.message);
  }
}

function updateServerSelectOptions(selectedId) {
  if (!modelServerSelect) return;
  modelServerSelect.innerHTML = "";
  if (!ollamaServers.length) {
    const placeholder = document.createElement("option");
    placeholder.textContent = "No servers configured";
    placeholder.value = "";
    modelServerSelect.appendChild(placeholder);
    modelServerSelect.disabled = true;
    return;
  }
  const placeholder = document.createElement("option");
  placeholder.textContent = "Select server";
  placeholder.value = "";
  modelServerSelect.appendChild(placeholder);
  ollamaServers.forEach((server) => {
    const option = document.createElement("option");
    option.value = server.id;
    option.textContent = server.name || server.url;
    if (selectedId && server.id === selectedId) {
      option.selected = true;
    }
    modelServerSelect.appendChild(option);
  });
  modelServerSelect.disabled = false;
  if (!selectedId) {
    modelServerSelect.value = defaultServerId || modelServerSelect.options[1]?.value || "";
  }
}

function resetServerFormState() {
  editingServerId = null;
  if (!serverForm) return;
  serverForm.reset();
  if (serverDefaultInput) serverDefaultInput.checked = false;
}

function populateServerForm(server) {
  if (!serverForm) return;
  editingServerId = server.id;
  serverNameInput.value = server.name || "";
  serverUrlInput.value = server.url || "";
  serverDescriptionInput.value = server.description || "";
  serverDefaultInput.checked = server.id === defaultServerId;
}

function renderServerList() {
  if (!serverList) return;
  serverList.innerHTML = "";
  if (!ollamaServers.length) {
    const empty = document.createElement("li");
    empty.className = "hint";
    empty.textContent = "No Ollama servers configured.";
    serverList.appendChild(empty);
    return;
  }
  ollamaServers.forEach((server) => {
    const li = document.createElement("li");
    li.className = "server-card";
    const title = document.createElement("div");
    title.className = "server-title";
    const nameEl = document.createElement("strong");
    nameEl.textContent = server.name;
    title.appendChild(nameEl);
    if (server.id === defaultServerId) {
      const badge = document.createElement("span");
      badge.className = "tag";
      badge.textContent = "Default";
      title.appendChild(badge);
    }
    li.appendChild(title);
    const urlEl = document.createElement("div");
    urlEl.className = "server-url";
    urlEl.textContent = server.url;
    li.appendChild(urlEl);
    if (server.description) {
      const hint = document.createElement("p");
      hint.className = "hint";
      hint.textContent = server.description;
      li.appendChild(hint);
    }
    const actions = document.createElement("div");
    actions.className = "server-actions";
    const setDefaultBtn = document.createElement("button");
    setDefaultBtn.className = "ghost tiny";
    setDefaultBtn.textContent = "Set default";
    setDefaultBtn.disabled = server.id === defaultServerId;
    setDefaultBtn.addEventListener("click", async () => {
      try {
        await api(`/api/ollama-servers/${server.id}`, {
          method: "POST",
          body: JSON.stringify({ default: true }),
        });
        await loadServers();
      } catch (err) {
        alert(err.message);
      }
    });

    const editBtn = document.createElement("button");
    editBtn.className = "ghost tiny";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      populateServerForm(server);
      if (serverList) {
        serverList.scrollIntoView({ block: "center" });
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "ghost tiny";
    deleteBtn.textContent = "Delete";
    deleteBtn.disabled = ollamaServers.length <= 1;
    deleteBtn.addEventListener("click", async () => {
      if (!window.confirm("Delete this server?")) return;
      try {
        await api(`/api/ollama-servers/${server.id}`, { method: "DELETE" });
        if (editingServerId === server.id) {
          resetServerFormState();
        }
        await loadServers();
      } catch (err) {
        alert(err.message);
      }
    });

    actions.appendChild(setDefaultBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    serverList.appendChild(li);
  });
}

async function loadServers() {
  try {
    const data = await api("/api/ollama-servers");
    ollamaServers = data.servers || [];
    defaultServerId = data.defaultServerId;
    if (settings) {
      settings.ollamaServers = ollamaServers;
      settings.defaultOllamaServerId = defaultServerId;
    }
    renderServerList();
    updateServerSelectOptions(settings?.defaultOllamaServerId || defaultServerId);
    updateRemoteServerOptions();
    const activeServer = remoteServerSelect?.value || defaultServerId;
    if (activeServer) {
      loadRemoteModels(activeServer);
    }
  } catch (err) {
    alert(err.message);
  }
}

function resetModelForm() {
  editingModelId = null;
  modelForm.reset();
  applyModelPreset("balanced");
  if (modelPresetInput) modelPresetInput.value = "balanced";
  if (displayNamePrefixInput) displayNamePrefixInput.value = "";
  if (displayNameSuffixInput) displayNameSuffixInput.value = "";
  modelProvider.value = "local";
  if (modelTypeSelect) modelTypeSelect.value = "normal";
  ollamaModelInput.value = "";
  openaiBaseUrlInput.value = "";
  openaiApiKeyInput.value = "";
  openaiModelNameInput.value = "";
  if (anthropicBaseUrlInput) anthropicBaseUrlInput.value = "";
  if (anthropicApiKeyInput) anthropicApiKeyInput.value = "";
  if (anthropicModelNameInput) anthropicModelNameInput.value = "";
  if (googleBaseUrlInput) googleBaseUrlInput.value = "";
  if (googleApiKeyInput) googleApiKeyInput.value = "";
  if (googleModelNameInput) googleModelNameInput.value = "";
  systemPromptInput.value = "";
  modelLimitFreeInput.value = "";
  modelLimitPlusInput.value = "";
  modelLimitProInput.value = "";
  formatIntegerInput(modelLimitFreeInput);
  formatIntegerInput(modelLimitPlusInput);
  formatIntegerInput(modelLimitProInput);
  modelAlwaysAvailableInput.checked = false;
  rankAccessContainer.querySelectorAll("input[type='checkbox']").forEach((box) => {
    box.checked = true;
  });
  modelFormStatus.textContent = "Create new";
  updateProviderVisibility();
  updateServerSelectOptions(settings?.defaultOllamaServerId || defaultServerId);
}

function populateModelForm(model) {
  document.getElementById("modelName").value = model.name || "";
  if (displayNamePrefixInput) displayNamePrefixInput.value = model.displayNamePrefix || "";
  if (displayNameSuffixInput) displayNameSuffixInput.value = model.displayNameSuffix || "";
  document.getElementById("modelPath").value = model.path || "";
  document.getElementById("maxNewTokens").value = model.maxNewTokens ?? 4096;
  formatIntegerInput(document.getElementById("maxNewTokens"));
  document.getElementById("temperature").value = model.temperature ?? 0.7;
  document.getElementById("topP").value = model.topP ?? 0.9;
  if (modelPresetInput) {
    modelPresetInput.value = detectModelPreset({
      maxNewTokens: model.maxNewTokens ?? 4096,
      temperature: model.temperature ?? 0.7,
      topP: model.topP ?? 0.9,
    });
  }
  modelProvider.value = model.provider || "local";
  if (modelTypeSelect) {
    const type = (model.modelType || "normal").toLowerCase();
    modelTypeSelect.value = type === "legacy" ? "legacy" : "normal";
  }
  ollamaModelInput.value = model.ollamaModel || "";
  openaiBaseUrlInput.value = model.openaiBaseUrl || "";
  openaiApiKeyInput.value = model.openaiApiKey || "";
  openaiModelNameInput.value = model.openaiModel || "";
  if (anthropicBaseUrlInput) anthropicBaseUrlInput.value = model.anthropicBaseUrl || "";
  if (anthropicApiKeyInput) anthropicApiKeyInput.value = model.anthropicApiKey || "";
  if (anthropicModelNameInput) anthropicModelNameInput.value = model.anthropicModel || "";
  if (googleBaseUrlInput) googleBaseUrlInput.value = model.googleBaseUrl || "";
  if (googleApiKeyInput) googleApiKeyInput.value = model.googleApiKey || "";
  if (googleModelNameInput) googleModelNameInput.value = model.googleModel || "";
  systemPromptInput.value = model.systemPrompt || "";
  const modelLimits = model.modelRankLimits || {};
  modelLimitFreeInput.value = modelLimits.Free ?? "";
  modelLimitPlusInput.value = modelLimits.Plus ?? "";
  modelLimitProInput.value = modelLimits.Pro ?? "";
  formatIntegerInput(modelLimitFreeInput);
  formatIntegerInput(modelLimitPlusInput);
  formatIntegerInput(modelLimitProInput);
  modelAlwaysAvailableInput.checked = Boolean(model.alwaysAvailable);
  const allowed = new Set(model.allowedRanks || ["Free", "Plus", "Pro"]);
  rankAccessContainer.querySelectorAll("input[type='checkbox']").forEach((box) => {
    box.checked = allowed.has(box.value);
  });
  modelFormStatus.textContent = `Editing: ${model.name}`;
  updateProviderVisibility();
  updateServerSelectOptions(model.ollamaServerId || settings?.defaultOllamaServerId || defaultServerId);
}

function updateProviderVisibility() {
  const isOllama = modelProvider.value === "ollama";
  const isOpenAI = modelProvider.value === "openai";
  const isAnthropic = modelProvider.value === "anthropic";
  const isGoogle = modelProvider.value === "google";
  const supportsLookup = isOpenAI || isAnthropic || isGoogle;
  document.getElementById("modelPath").parentElement.style.display =
    isOllama || isOpenAI || isAnthropic || isGoogle ? "none" : "grid";
  ollamaModelInput.parentElement.style.display = isOllama ? "grid" : "none";
  if (openaiBaseUrlGroup) openaiBaseUrlGroup.style.display = isOpenAI ? "grid" : "none";
  if (openaiApiKeyGroup) openaiApiKeyGroup.style.display = isOpenAI ? "grid" : "none";
  if (openaiModelGroup) openaiModelGroup.style.display = isOpenAI ? "grid" : "none";
  if (anthropicBaseUrlGroup) anthropicBaseUrlGroup.style.display = isAnthropic ? "grid" : "none";
  if (anthropicApiKeyGroup) anthropicApiKeyGroup.style.display = isAnthropic ? "grid" : "none";
  if (anthropicModelGroup) anthropicModelGroup.style.display = isAnthropic ? "grid" : "none";
  if (googleBaseUrlGroup) googleBaseUrlGroup.style.display = isGoogle ? "grid" : "none";
  if (googleApiKeyGroup) googleApiKeyGroup.style.display = isGoogle ? "grid" : "none";
  if (googleModelGroup) googleModelGroup.style.display = isGoogle ? "grid" : "none";
  if (ollamaServerGroup) {
    ollamaServerGroup.classList.toggle("hidden", !isOllama);
  }
  if (modelServerSelect) {
    modelServerSelect.disabled = !isOllama || !ollamaServers.length;
    if (!modelServerSelect.value && ollamaServers.length) {
      modelServerSelect.value = defaultServerId || modelServerSelect.options[1]?.value || "";
    }
  }
  if (providerModelLookup) {
    providerModelLookup.classList.toggle("hidden", !supportsLookup);
  }
  if (!supportsLookup && providerModelSelect) {
    providerModelSelect.innerHTML = "";
    providerModelOptions = [];
    providerModelsLoading = false;
  }
  if (supportsLookup) {
    renderProviderModelOptions();
  }
}

function getFirstProviderKey(provider) {
  const providerKeys = systemSettings?.providerKeys || {};
  const fromSystem = providerKeys?.[provider];
  if (Array.isArray(fromSystem) && fromSystem.length) {
    return String(fromSystem[0] || "").trim();
  }
  if (typeof fromSystem === "string" && fromSystem.trim()) {
    return fromSystem.trim().split("\n").map((line) => line.trim()).find(Boolean) || "";
  }
  return "";
}

function getProviderLookupPayload() {
  const provider = modelProvider.value;
  if (provider === "openai") {
    return {
      provider,
      baseUrl: openaiBaseUrlInput?.value || "",
      apiKey: (openaiApiKeyInput?.value || "").trim() || getFirstProviderKey("openai"),
      modelHint: openaiModelNameInput?.value || "",
    };
  }
  if (provider === "anthropic") {
    return {
      provider,
      baseUrl: anthropicBaseUrlInput?.value || "",
      apiKey: (anthropicApiKeyInput?.value || "").trim() || getFirstProviderKey("anthropic"),
      modelHint: anthropicModelNameInput?.value || "",
    };
  }
  if (provider === "google") {
    return {
      provider,
      baseUrl: googleBaseUrlInput?.value || "",
      apiKey: (googleApiKeyInput?.value || "").trim() || getFirstProviderKey("google"),
      modelHint: googleModelNameInput?.value || "",
    };
  }
  return null;
}

function applyProviderModelSelection(modelId) {
  if (!modelId) return;
  const provider = modelProvider.value;
  if (provider === "openai" && openaiModelNameInput) {
    openaiModelNameInput.value = modelId;
  } else if (provider === "anthropic" && anthropicModelNameInput) {
    anthropicModelNameInput.value = modelId;
  } else if (provider === "google" && googleModelNameInput) {
    googleModelNameInput.value = modelId;
  }
}

function renderProviderModelOptions() {
  if (!providerModelSelect) return;
  providerModelSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = providerModelsLoading
    ? "Loading provider models..."
    : providerModelOptions.length
      ? "Select provider model"
      : "No provider models loaded";
  providerModelSelect.appendChild(placeholder);
  const currentValue = (getProviderLookupPayload()?.modelHint || "").trim();
  providerModelOptions.forEach((model) => {
    const opt = document.createElement("option");
    opt.value = model.id;
    opt.textContent = model.label ? `${model.label} (${model.id})` : model.id;
    if (currentValue && model.id === currentValue) {
      opt.selected = true;
    }
    providerModelSelect.appendChild(opt);
  });
}

async function fetchProviderModels() {
  const payload = getProviderLookupPayload();
  if (!payload) return;
  providerModelsLoading = true;
  renderProviderModelOptions();
  if (fetchProviderModelsBtn) fetchProviderModelsBtn.disabled = true;
  try {
    const data = await api("/api/provider-models", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    providerModelOptions = Array.isArray(data.models) ? data.models : [];
    renderProviderModelOptions();
    if (providerModelOptions.length === 1) {
      const selectedId = providerModelOptions[0].id;
      if (providerModelSelect) providerModelSelect.value = selectedId;
      applyProviderModelSelection(selectedId);
    }
  } catch (err) {
    alert(err.message);
  } finally {
    providerModelsLoading = false;
    renderProviderModelOptions();
    if (fetchProviderModelsBtn) fetchProviderModelsBtn.disabled = false;
  }
}

async function reorderModelsByIds(orderedModelIds) {
  await api("/api/models/reorder", {
    method: "POST",
    body: JSON.stringify({ orderedModelIds }),
  });
  await loadModels();
  await loadSystem();
}

function renderModelList() {
  modelList.innerHTML = "";
  if (models.length === 0) {
    const empty = document.createElement("li");
    empty.className = "hint";
    empty.textContent = "No models configured yet.";
    modelList.appendChild(empty);
    updateStats();
    return;
  }
  models.forEach((model, index) => {
    const li = document.createElement("li");
    li.className = "model-card";
    const header = document.createElement("div");
    header.className = "model-header";
    const title = document.createElement("div");
    title.className = "model-title";
    title.textContent = model.name;
    header.appendChild(title);
    if (model.id === activeModelId) {
      const badge = document.createElement("span");
      badge.className = "badge active";
      badge.textContent = "Active";
      header.appendChild(badge);
    }
    const meta = document.createElement("div");
    meta.className = "model-meta";
    const cache = model.cache || {};
    const cacheText = cache.error
      ? `Error: ${cache.error}`
      : cache.kind
        ? `Loaded (${cache.kind})`
        : "Not loaded yet";
    const providerLabel =
      model.provider === "ollama"
        ? `Ollama: ${model.ollamaModel || "Unset"}`
        : model.provider === "openai"
          ? `OpenAI/vLLM: ${model.openaiModel || "Unset"} @ ${model.openaiBaseUrl || "Unset"}`
          : model.provider === "anthropic"
            ? `Anthropic: ${model.anthropicModel || "Unset"} @ ${
                model.anthropicBaseUrl || "https://api.anthropic.com/v1"
              }`
            : model.provider === "google"
              ? `Google: ${model.googleModel || "Unset"} @ ${
                  model.googleBaseUrl || "https://generativelanguage.googleapis.com/v1beta"
                }`
        : `Local path: ${model.path || "Not set"}`;
    const typeLabel = model.modelType === "legacy" ? "Type: Legacy" : "Type: Normal";
    const displayPrefix = (model.displayNamePrefix || "").trim();
    const displaySuffix = (model.displayNameSuffix || "").trim();
    const combinedDisplay = [displayPrefix, displaySuffix].filter(Boolean).join(" ");
    const displayLabel = combinedDisplay ? `Display: ${combinedDisplay}` : "Display: default";
    const ranksLabel = `Access: ${(model.allowedRanks || []).join(", ") || "None"}`;
  const systemLabel = model.systemPrompt ? "System prompt set" : "No system prompt";
  const limits = model.modelRankLimits || {};
  const limitLabel = `Limits F:${limits.Free ?? "∞"} P:${limits.Plus ?? "∞"} Pro:${limits.Pro ?? "∞"}`;
  const fallbackLabel = model.alwaysAvailable ? "Fallback: on" : "Fallback: off";
    const server = ollamaServers.find((srv) => srv.id === model.ollamaServerId);
    const serverLabel = server ? `Server: ${server.name}` : "Server: —";
    meta.textContent = `${providerLabel} • ${typeLabel} • ${displayLabel} • ${serverLabel} • Tokens: ${
      model.maxNewTokens
    } • Temp: ${model.temperature} • Top P: ${model.topP} • ${ranksLabel} • ${limitLabel} • ${fallbackLabel} • ${systemLabel} • ${cacheText}`;

    const actions = document.createElement("div");
    actions.className = "model-actions-row";

    const activateBtn = document.createElement("button");
    activateBtn.className = "ghost tiny";
    activateBtn.textContent = "Activate";
    activateBtn.disabled = model.id === activeModelId;
    activateBtn.addEventListener("click", async () => {
      try {
        await api(`/api/models/${model.id}/activate`, { method: "POST" });
        await loadModels();
      } catch (err) {
        alert(err.message);
      }
    });

    const editBtn = document.createElement("button");
    editBtn.className = "ghost tiny";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      editingModelId = model.id;
      populateModelForm(model);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "ghost tiny";
    deleteBtn.textContent = "Delete";
    deleteBtn.disabled = models.length <= 1;
    deleteBtn.addEventListener("click", async () => {
      if (!window.confirm("Delete this model?")) return;
      try {
        await api(`/api/models/${model.id}`, { method: "DELETE" });
        if (editingModelId === model.id) {
          resetModelForm();
        }
        await loadModels();
      } catch (err) {
        alert(err.message);
      }
    });

    const moveUpBtn = document.createElement("button");
    moveUpBtn.className = "ghost tiny";
    moveUpBtn.textContent = "Move Up";
    moveUpBtn.disabled = index === 0;
    moveUpBtn.addEventListener("click", async () => {
      if (index === 0) return;
      const ordered = models.map((m) => m.id);
      [ordered[index - 1], ordered[index]] = [ordered[index], ordered[index - 1]];
      try {
        await reorderModelsByIds(ordered);
      } catch (err) {
        alert(err.message);
      }
    });

    const moveDownBtn = document.createElement("button");
    moveDownBtn.className = "ghost tiny";
    moveDownBtn.textContent = "Move Down";
    moveDownBtn.disabled = index === models.length - 1;
    moveDownBtn.addEventListener("click", async () => {
      if (index >= models.length - 1) return;
      const ordered = models.map((m) => m.id);
      [ordered[index], ordered[index + 1]] = [ordered[index + 1], ordered[index]];
      try {
        await reorderModelsByIds(ordered);
      } catch (err) {
        alert(err.message);
      }
    });

    actions.appendChild(activateBtn);
    actions.appendChild(editBtn);
    actions.appendChild(moveUpBtn);
    actions.appendChild(moveDownBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(header);
    li.appendChild(meta);
    li.appendChild(actions);
    modelList.appendChild(li);
  });
  updateStats();
}

function updateDemoModelOptions() {
  if (!demoModelIdInput) return;
  demoModelIdInput.innerHTML = "";
  if (!models.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No models available";
    demoModelIdInput.appendChild(option);
    demoModelIdInput.disabled = true;
    return;
  }
  demoModelIdInput.disabled = false;
  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model.id;
    option.textContent = model.name || "Model";
    demoModelIdInput.appendChild(option);
  });
  const preferred = systemSettings?.demoModelId || activeModelId || models[0]?.id;
  demoModelIdInput.value = preferred;
  if (!demoModelIdInput.value && models[0]) {
    demoModelIdInput.value = models[0].id;
  }
}

function updateDefaultModelOptions() {
  if (!defaultModelIdInput) return;
  defaultModelIdInput.innerHTML = "";
  if (!models.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No models available";
    defaultModelIdInput.appendChild(option);
    defaultModelIdInput.disabled = true;
    return;
  }
  defaultModelIdInput.disabled = false;
  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model.id;
    option.textContent = model.name || "Model";
    defaultModelIdInput.appendChild(option);
  });
  const preferred = systemSettings?.activeModelId || activeModelId || models[0]?.id;
  defaultModelIdInput.value = preferred;
  if (!defaultModelIdInput.value && models[0]) {
    defaultModelIdInput.value = models[0].id;
  }
}

function updateDemotionModelOptions() {
  const selects = [
    demotionModelFreeInput,
    demotionModelPlusInput,
    demotionModelProInput,
    demotionModelDemoInput,
  ].filter(Boolean);
  if (!selects.length) return;
  const current = systemSettings?.demotionModelIds || {};
  selects.forEach((selectEl) => {
    selectEl.innerHTML = "";
    const none = document.createElement("option");
    none.value = "";
    none.textContent = "None";
    selectEl.appendChild(none);
    models.forEach((model) => {
      const option = document.createElement("option");
      option.value = model.id;
      option.textContent = model.name || "Model";
      selectEl.appendChild(option);
    });
  });
  if (demotionModelFreeInput) demotionModelFreeInput.value = current.Free || "";
  if (demotionModelPlusInput) demotionModelPlusInput.value = current.Plus || "";
  if (demotionModelProInput) demotionModelProInput.value = current.Pro || "";
  if (demotionModelDemoInput) demotionModelDemoInput.value = current.Demo || "";
}

async function loadModels() {
  const data = await api("/api/models");
  models = data.models || [];
  activeModelId = data.activeModelId || null;
  renderModelList();
  updateModelHint();
  updateDemoModelOptions();
  updateDefaultModelOptions();
  updateDemotionModelOptions();
}

async function loadSystem() {
  const data = await api("/api/system");
  systemSettings = data.settings || {};
  applyAdminBrand(systemSettings.uiName);
  if (searchEnabledInput) {
    searchEnabledInput.checked = Boolean(systemSettings.searchEnabled);
  }
  if (searchMaxResultsInput) {
    searchMaxResultsInput.value = systemSettings.searchMaxResults ?? 5;
  }
  if (pythonInterpreterEnabledInput) {
    pythonInterpreterEnabledInput.checked = Boolean(systemSettings.pythonInterpreterEnabled);
  }
  if (pythonInterpreterTimeoutSecInput) {
    pythonInterpreterTimeoutSecInput.value = systemSettings.pythonInterpreterTimeoutSec ?? 6;
  }
  if (pythonInterpreterMaxOutputCharsInput) {
    pythonInterpreterMaxOutputCharsInput.value =
      systemSettings.pythonInterpreterMaxOutputChars ?? "12,000";
    formatIntegerInput(pythonInterpreterMaxOutputCharsInput);
  }
  if (uiNameInput) {
    uiNameInput.value = systemSettings.uiName || "LLM WebUI";
  }
  if (securityGuardEnabledInput) {
    securityGuardEnabledInput.checked = systemSettings.securityGuardEnabled !== false;
  }
  if (securityGuardPromptInput) {
    securityGuardPromptInput.value = systemSettings.securityGuardPrompt || "";
  }
  const providerKeys = systemSettings.providerKeys || {};
  const asLines = (value) => {
    if (Array.isArray(value)) return value.filter(Boolean).join("\n");
    if (typeof value === "string") return value;
    return "";
  };
  if (providerKeyOpenAIInput) providerKeyOpenAIInput.value = asLines(providerKeys.openai);
  if (providerKeyAnthropicInput) providerKeyAnthropicInput.value = asLines(providerKeys.anthropic);
  if (providerKeyGoogleInput) providerKeyGoogleInput.value = asLines(providerKeys.google);
  if (demoModelIdInput) {
    const fallbackDemoModelId = activeModelId || models[0]?.id || "";
    demoModelIdInput.value = systemSettings.demoModelId || fallbackDemoModelId;
  }
  if (defaultModelIdInput) {
    const fallbackDefault = activeModelId || models[0]?.id || "";
    defaultModelIdInput.value = systemSettings.activeModelId || fallbackDefault;
  }
  const allowed = new Set(systemSettings.searchAllowedRanks || ["Plus", "Pro"]);
  const searchRanks = document.getElementById("searchRankAccess");
  if (searchRanks) {
    searchRanks.querySelectorAll("input[type='checkbox']").forEach((box) => {
      box.checked = allowed.has(box.value);
    });
  }
  const limits = systemSettings.rankLimits || {};
  if (limitFreeInput) limitFreeInput.value = limits.Free?.dailyMessages ?? "";
  if (limitPlusInput) limitPlusInput.value = limits.Plus?.dailyMessages ?? "";
  if (limitProInput) limitProInput.value = limits.Pro?.dailyMessages ?? "";
  if (limitFreeTokensInput) limitFreeTokensInput.value = limits.Free?.dailyTokens ?? "";
  if (limitPlusTokensInput) limitPlusTokensInput.value = limits.Plus?.dailyTokens ?? "";
  if (limitProTokensInput) limitProTokensInput.value = limits.Pro?.dailyTokens ?? "";
  formatIntegerInput(limitFreeInput);
  formatIntegerInput(limitPlusInput);
  formatIntegerInput(limitProInput);
  formatIntegerInput(limitFreeTokensInput);
  formatIntegerInput(limitPlusTokensInput);
  formatIntegerInput(limitProTokensInput);
  updateDemotionModelOptions();
}

function populateEditableFileSelect() {
  if (!editableFileSelect) return;
  editableFileSelect.innerHTML = "";
  if (!editableFiles.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No editable files";
    editableFileSelect.appendChild(option);
    editableFileSelect.disabled = true;
    return;
  }
  editableFileSelect.disabled = false;
  editableFiles.forEach((file) => {
    const option = document.createElement("option");
    option.value = file.path;
    option.textContent = file.path;
    editableFileSelect.appendChild(option);
  });
  if (activeEditableFile && editableFiles.some((file) => file.path === activeEditableFile)) {
    editableFileSelect.value = activeEditableFile;
  } else {
    activeEditableFile = editableFiles[0].path;
    editableFileSelect.value = activeEditableFile;
  }
}

async function loadEditableFiles() {
  if (!editableFileSelect) return;
  const data = await api("/api/admin/files");
  editableFiles = Array.isArray(data.files) ? data.files : [];
  populateEditableFileSelect();
  if (activeEditableFile) {
    await loadEditableFileContent(activeEditableFile);
  } else if (editableFiles[0]?.path) {
    await loadEditableFileContent(editableFiles[0].path);
  }
}

async function loadEditableFileContent(pathOverride = "") {
  if (!editableFileContent) return;
  const target = (pathOverride || editableFileSelect?.value || "").trim();
  if (!target) {
    editableFileContent.value = "";
    setEditableFileStatus("Select a file.");
    return;
  }
  const data = await api("/api/admin/files/read", {
    method: "POST",
    body: JSON.stringify({ path: target }),
  });
  activeEditableFile = data.path || target;
  editableFileContent.value = data.content || "";
  setEditableFileStatus(`Loaded ${activeEditableFile}`);
}

async function saveEditableFileContent() {
  if (!editableFileContent) return;
  const target = (editableFileSelect?.value || activeEditableFile || "").trim();
  if (!target) {
    setEditableFileStatus("Select a file first.", true);
    return;
  }
  const data = await api("/api/admin/files/save", {
    method: "POST",
    body: JSON.stringify({
      path: target,
      content: editableFileContent.value || "",
    }),
  });
  activeEditableFile = data.path || target;
  setEditableFileStatus(`Saved ${activeEditableFile}`);
}

async function loadRawSettingsEditor() {
  if (!rawSettingsInput) return;
  const data = await api("/api/system/raw");
  rawSettingsInput.value = JSON.stringify(data.settings || {}, null, 2);
  setRawSettingsStatus("Raw settings loaded.");
}

async function saveRawSettingsEditor() {
  if (!rawSettingsInput) return;
  let parsed;
  try {
    parsed = JSON.parse(rawSettingsInput.value);
  } catch (err) {
    setRawSettingsStatus(`Invalid JSON: ${err.message}`, true);
    return;
  }
  const data = await api("/api/system/raw", {
    method: "POST",
    body: JSON.stringify({ settings: parsed }),
  });
  systemSettings = data.settings || {};
  rawSettingsInput.value = JSON.stringify(systemSettings, null, 2);
  setRawSettingsStatus("Raw settings saved.");
  await loadServers();
  await loadModels();
  await loadSystem();
}

async function loadMe() {
  try {
    const data = await api("/api/me");
    currentUser = data.user;
    settings = data.settings;
    if (!currentUser.admin) {
      throw new Error("Admin only");
    }
    adminWelcome.textContent = `Signed in as ${currentUser.name}`;
    authPanel.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    resetModelForm();
    await loadUsers();
    await loadServers();
    await loadModels();
    await loadSystem();
    await loadEditableFiles();
    await loadRawSettingsEditor();
    await loadFeedback();
  } catch (err) {
    authPanel.classList.remove("hidden");
    adminPanel.classList.add("hidden");
    logoutBtn.classList.add("hidden");
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
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
    alert(err.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await api("/api/logout", { method: "POST" });
  currentUser = null;
  authPanel.classList.remove("hidden");
  adminPanel.classList.add("hidden");
  logoutBtn.classList.add("hidden");
});

createUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await api("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: document.getElementById("newName").value,
        email: document.getElementById("newEmail").value,
        password: document.getElementById("newPassword").value,
        rank: document.getElementById("newRank").value,
      }),
    });
    createUserForm.reset();
    await loadUsers();
  } catch (err) {
    alert(err.message);
  }
});

modelForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const allowedRanks = Array.from(
      rankAccessContainer.querySelectorAll("input[type='checkbox']")
    )
      .filter((box) => box.checked)
      .map((box) => box.value);
    if (!allowedRanks.length) {
      alert("Select at least one rank.");
      return;
    }
    if (modelProvider.value === "ollama" && !ollamaModelInput.value.trim()) {
      alert("Ollama model name is required.");
      return;
    }
    if (modelProvider.value === "openai") {
      if (!openaiBaseUrlInput.value.trim()) {
        alert("OpenAI-compatible base URL is required.");
        return;
      }
      if (!openaiModelNameInput.value.trim()) {
        alert("OpenAI-compatible model name is required.");
        return;
      }
    }
    if (modelProvider.value === "anthropic" && !anthropicModelNameInput?.value.trim()) {
      alert("Anthropic model name is required.");
      return;
    }
    if (modelProvider.value === "google" && !googleModelNameInput?.value.trim()) {
      alert("Google model name is required.");
      return;
    }
    const internalNameRaw = document.getElementById("modelName").value.trim();
    const mainNameRaw = (displayNamePrefixInput?.value || "").trim();
    const variantRaw = (displayNameSuffixInput?.value || "").trim();
    const internalName = internalNameRaw || [mainNameRaw, variantRaw].filter(Boolean).join(" ") || "Untitled model";
    const maxNewTokens = parseIntegerInput(document.getElementById("maxNewTokens").value);
    if (maxNewTokens == null) {
      alert("Max New Tokens must be a positive number.");
      return;
    }
    const payload = {
      name: internalName,
      displayNamePrefix: displayNamePrefixInput?.value || "",
      displayNameSuffix: displayNameSuffixInput?.value || "",
      path: document.getElementById("modelPath").value,
      maxNewTokens,
      temperature: document.getElementById("temperature").value,
      topP: document.getElementById("topP").value,
      provider: modelProvider.value,
      modelType: modelTypeSelect?.value || "normal",
      ollamaModel: ollamaModelInput.value,
      openaiBaseUrl: openaiBaseUrlInput.value,
      openaiApiKey: openaiApiKeyInput.value,
      openaiModel: openaiModelNameInput.value,
      anthropicBaseUrl: anthropicBaseUrlInput?.value || "",
      anthropicApiKey: anthropicApiKeyInput?.value || "",
      anthropicModel: anthropicModelNameInput?.value || "",
      googleBaseUrl: googleBaseUrlInput?.value || "",
      googleApiKey: googleApiKeyInput?.value || "",
      googleModel: googleModelNameInput?.value || "",
      allowedRanks,
      systemPrompt: systemPromptInput.value,
      modelRankLimits: {
        Free: parseIntegerInput(modelLimitFreeInput.value),
        Plus: parseIntegerInput(modelLimitPlusInput.value),
        Pro: parseIntegerInput(modelLimitProInput.value),
      },
      alwaysAvailable: modelAlwaysAvailableInput.checked,
      ollamaServerId:
        modelProvider.value === "ollama"
          ? modelServerSelect.value || defaultServerId
          : null,
    };
    if (editingModelId) {
      await api(`/api/models/${editingModelId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } else {
      await api("/api/models", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }
    resetModelForm();
    await loadModels();
  } catch (err) {
    alert(err.message);
  }
});

refreshUsersBtn.addEventListener("click", async () => {
  try {
    await loadUsers();
  } catch (err) {
    alert(err.message);
  }
});

refreshModelsBtn.addEventListener("click", async () => {
  try {
    await loadModels();
  } catch (err) {
    alert(err.message);
  }
});

remoteServerSelect?.addEventListener("change", () => {
  const serverId = remoteServerSelect.value || defaultServerId;
  if (!serverId) return;
  loadRemoteModels(serverId);
});

refreshRemoteModelsBtn?.addEventListener("click", () => {
  const serverId = remoteServerSelect?.value || defaultServerId;
  if (!serverId) return;
  loadRemoteModels(serverId);
});

remoteSearchInput?.addEventListener("input", renderRemoteLists);

modelProvider.addEventListener("change", () => {
  updateProviderVisibility();
});

fetchProviderModelsBtn?.addEventListener("click", async () => {
  await fetchProviderModels();
});

providerModelSelect?.addEventListener("change", () => {
  applyProviderModelSelection(providerModelSelect.value);
});

modelPresetInput?.addEventListener("change", () => {
  const preset = modelPresetInput.value;
  if (preset && preset !== "custom") {
    applyModelPreset(preset);
  }
});

["maxNewTokens", "temperature", "topP"].forEach((id) => {
  const input = document.getElementById(id);
  input?.addEventListener("input", () => {
    if (!modelPresetInput) return;
    modelPresetInput.value = detectModelPreset({
      maxNewTokens: document.getElementById("maxNewTokens").value,
      temperature: document.getElementById("temperature").value,
      topP: document.getElementById("topP").value,
    });
  });
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const searchRanks = document.getElementById("searchRankAccess");
    const allowedRanks = Array.from(
      searchRanks.querySelectorAll("input[type='checkbox']")
    )
      .filter((box) => box.checked)
      .map((box) => box.value);
    if (!allowedRanks.length) {
      alert("Select at least one rank for search access.");
      return;
    }
    await api("/api/system", {
      method: "POST",
      body: JSON.stringify({
        uiName: uiNameInput?.value || "LLM WebUI",
        searchEnabled: searchEnabledInput.checked,
        searchMaxResults: searchMaxResultsInput.value,
        pythonInterpreterEnabled: Boolean(pythonInterpreterEnabledInput?.checked),
        pythonInterpreterTimeoutSec: Number(pythonInterpreterTimeoutSecInput?.value || 6),
        pythonInterpreterMaxOutputChars: parseIntegerInput(
          pythonInterpreterMaxOutputCharsInput?.value || ""
        ),
        demoModelId: demoModelIdInput?.value || null,
        activeModelId: defaultModelIdInput?.value || null,
        searchAllowedRanks: allowedRanks,
      }),
    });
    await loadSystem();
  } catch (err) {
    alert(err.message);
  }
});

securityForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await api("/api/system", {
      method: "POST",
      body: JSON.stringify({
        securityGuardEnabled: Boolean(securityGuardEnabledInput?.checked),
        securityGuardPrompt: securityGuardPromptInput?.value || "",
      }),
    });
    await loadSystem();
  } catch (err) {
    alert(err.message);
  }
});

apiKeysForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const toList = (text) =>
      String(text || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    await api("/api/system", {
      method: "POST",
      body: JSON.stringify({
        providerKeys: {
          openai: toList(providerKeyOpenAIInput?.value),
          anthropic: toList(providerKeyAnthropicInput?.value),
          google: toList(providerKeyGoogleInput?.value),
        },
      }),
    });
    await loadSystem();
  } catch (err) {
    alert(err.message);
  }
});

rankLimitsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const rankLimits = {
      Free: {
        dailyMessages: parseIntegerInput(limitFreeInput.value),
        dailyTokens: parseIntegerInput(limitFreeTokensInput?.value || ""),
      },
      Plus: {
        dailyMessages: parseIntegerInput(limitPlusInput.value),
        dailyTokens: parseIntegerInput(limitPlusTokensInput?.value || ""),
      },
      Pro: {
        dailyMessages: parseIntegerInput(limitProInput.value),
        dailyTokens: parseIntegerInput(limitProTokensInput?.value || ""),
      },
    };
    const demotionModelIds = {
      Free: demotionModelFreeInput?.value || null,
      Plus: demotionModelPlusInput?.value || null,
      Pro: demotionModelProInput?.value || null,
      Demo: demotionModelDemoInput?.value || null,
    };
    await api("/api/system", {
      method: "POST",
      body: JSON.stringify({ rankLimits, demotionModelIds }),
    });
    await loadSystem();
  } catch (err) {
    alert(err.message);
  }
});

reloadRawSettingsBtn?.addEventListener("click", async () => {
  try {
    await loadRawSettingsEditor();
  } catch (err) {
    setRawSettingsStatus(err.message, true);
  }
});

saveRawSettingsBtn?.addEventListener("click", async () => {
  try {
    await saveRawSettingsEditor();
  } catch (err) {
    setRawSettingsStatus(err.message, true);
  }
});

editableFileSelect?.addEventListener("change", async () => {
  try {
    await loadEditableFileContent(editableFileSelect.value);
  } catch (err) {
    setEditableFileStatus(err.message, true);
  }
});

reloadEditableFileBtn?.addEventListener("click", async () => {
  try {
    await loadEditableFileContent(editableFileSelect?.value || activeEditableFile);
  } catch (err) {
    setEditableFileStatus(err.message, true);
  }
});

saveEditableFileBtn?.addEventListener("click", async () => {
  try {
    await saveEditableFileContent();
  } catch (err) {
    setEditableFileStatus(err.message, true);
  }
});

async function loadFeedback() {
  const data = await api("/api/feedback");
  feedbackList.innerHTML = "";
  const items = data.feedback || [];
  if (!items.length) {
    const empty = document.createElement("li");
    empty.className = "hint";
    empty.textContent = "No feedback yet.";
    feedbackList.appendChild(empty);
    return;
  }
  items.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "feedback-card";
    const meta = document.createElement("div");
    meta.className = "feedback-meta";
    meta.textContent = `${entry.rating || "unrated"} • ${entry.createdAt}`;
    const detail = document.createElement("div");
    detail.textContent = entry.details || "No additional details.";
    const context = document.createElement("div");
    context.className = "hint";
    context.textContent = `User: ${entry.userEmail || entry.userId} • Model: ${
      entry.modelId || "unknown"
    }`;
    li.appendChild(meta);
    li.appendChild(detail);
    li.appendChild(context);
    feedbackList.appendChild(li);
  });
}

refreshFeedbackBtn.addEventListener("click", async () => {
  try {
    await loadFeedback();
  } catch (err) {
    alert(err.message);
  }
});

resetModelFormBtn.addEventListener("click", () => {
  resetModelForm();
});

clearModelCacheBtn.addEventListener("click", async () => {
  try {
    await api("/api/models/cache/clear", { method: "POST" });
    await loadModels();
  } catch (err) {
    alert(err.message);
  }
});

serverForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!serverForm) return;
  const payload = {
    name: serverNameInput.value,
    url: serverUrlInput.value,
    description: serverDescriptionInput.value,
    default: serverDefaultInput.checked,
  };
  if (editingServerId) {
    try {
      await api(`/api/ollama-servers/${editingServerId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      resetServerFormState();
      await loadServers();
    } catch (err) {
      alert(err.message);
    }
  } else {
    try {
      await api("/api/ollama-servers", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      resetServerFormState();
      await loadServers();
    } catch (err) {
      alert(err.message);
    }
  }
});

resetServerFormBtn?.addEventListener("click", () => {
  resetServerFormState();
});

refreshServersBtn?.addEventListener("click", async () => {
  try {
    await loadServers();
  } catch (err) {
    alert(err.message);
  }
});

closeUserChatsBtn?.addEventListener("click", () => {
  closeUserChatsModal();
});

userChatsModal?.addEventListener("click", (event) => {
  if (event.target === userChatsModal) {
    closeUserChatsModal();
  }
});

setupPasswordToggles();
setupIntegerFormatting();
applyAdminBrand("LLM WebUI");
loadMe();
