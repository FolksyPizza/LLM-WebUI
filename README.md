# LLM WebUI

Local-first GPT-style chat UI for running and managing models with a separate admin control plane.

- Main app + public landing: `0.0.0.0:8100`
- Admin panel: `0.0.0.0:8180`

## What this repo provides

- Signed-out landing chat at `/` with streaming responses.
- Authenticated chat app at `/app` with sidebar, chat history, settings, archive, feedback, and model picker.
- Admin panel at `:8180` for users, ranks, limits, models, fallback/demotion models, web search controls, and server management.
- Optional built-in Python interpreter with admin site-wide controls + per-user opt-in.
- Encrypted server-side chat persistence for signed-in users.
- Provider support:
  - Local `.pt` (TorchScript / torch.load)
  - Ollama
  - OpenAI-compatible `v1` endpoints (OpenAI, vLLM, similar)
  - Anthropic Messages API
  - Google Gemini API
- Markdown rendering with code highlighting, tables, blockquotes, and math rendering support.
- Streaming inference via SSE.

## Quick start

### 1) Set up environment

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2) Run both servers

```bash
source .venv/bin/activate
python app.py
```

### 3) Open the app

- Landing chat: `http://0.0.0.0:8100/`
- Login: `http://0.0.0.0:8100/login`
- Signed-in app: `http://0.0.0.0:8100/app`
- Admin panel: `http://0.0.0.0:8180`

## Auth and routing behavior

- Signed-out users:
  - `/` -> landing chat
  - `/app` -> redirected to `/`
- Signed-in users:
  - `/` and `/demo` -> redirected to `/app`
  - `/app` -> full app
- First created user becomes admin automatically.

## How to use (end users)

1. Open `/` and start chatting immediately (public landing session).
2. Sign in or create account to access full features.
3. In `/app`, use:
   - Sidebar for chat history and chat actions.
   - Model picker for available models by access level.
   - Settings for theme, archive/history actions, account actions, and toggles.

## How to use (admins)

1. Open admin panel at `http://0.0.0.0:8180`.
2. Configure models in **Model Editor**:
   - Set provider and provider-specific fields.
   - Set allowed ranks and per-model limits.
   - Optionally mark fallback/demotion behavior.
   - Default max output tokens for new models is `4096` (you can lower per model for compatibility).
3. Configure system-level behavior:
   - UI name (`uiName`)
   - Web search enable/disable and allowed ranks
   - Python interpreter enable/disable, timeout, output cap
   - Demo/signed-out model (`demoModelId`)
   - Rank quotas and demotion models for Free/Plus/Pro/Demo
4. Configure Ollama servers in **Ollama Servers** and set default server.
5. Use **Raw Settings JSON** for advanced full-object edits.
6. In **Users**, use `View Chats` to inspect a user's stored chat history (admin only).

## Provider setup notes

### Local `.pt`

- Provider: `local`
- Required: `Model Path (.pt)`

### Ollama

- Provider: `ollama`
- Required: `Ollama Model Name`
- Optional: choose specific server from configured Ollama server list.

### OpenAI-compatible (`v1`)

- Provider: `openai`
- Required:
  - `OpenAI-Compatible Base URL` (example: `http://host:8000/v1`)
  - `OpenAI-Compatible Model Name`
- Optional: `API Key`

### Anthropic

- Provider: `anthropic`
- Required:
  - `Anthropic API Key`
  - `Anthropic Model Name`
- Optional: `Anthropic Base URL` (default used if empty)

### Google Gemini

- Provider: `google`
- Required:
  - `Google API Key`
  - `Google Model Name`
- Optional: `Google Base URL` (default used if empty)

## Configuration

Configuration can be done in two ways:

- Admin UI (recommended): normal controls + Raw Settings JSON editor.
- Direct file edit: `data/state.json`.

For full key map and examples, see:
- `CONFIGURATION.md`

## Main API map

- Auth:
  - `POST /api/signup`
  - `POST /api/login`
  - `POST /api/logout`
  - `GET /api/me`
  - `POST /api/me/preferences`
  - `POST /api/me/delete`
- Chat:
  - `POST /api/infer`
  - `GET /api/infer/stream`
  - `POST /api/python/execute` (requires admin site-wide enable + user opt-in)
- Landing/public:
  - `GET /api/public-config`
  - `POST /api/demo/infer`
  - `GET /api/demo/infer/stream`
- Search and feedback:
  - `GET /api/search`
  - `GET|POST /api/feedback`
- Admin:
  - `GET|POST /api/system`
  - `GET|POST /api/system/raw`
  - `GET|POST /api/models`
  - `POST|DELETE /api/models/<model_id>`
  - `POST /api/models/<model_id>/activate`
  - `GET|POST /api/ollama-servers`
  - `POST|DELETE /api/ollama-servers/<server_id>`
  - `GET|POST /api/ollama-servers/<server_id>/models`
  - `DELETE /api/ollama-servers/<server_id>/models/<model_name>`
  - `GET /api/users`, `POST /api/users`, and related user admin routes
  - `GET /api/users/<user_id>/chats`
- User chats:
  - `GET|POST /api/chats`

## Repo layout

- `app.py`: backend + routing + inference/provider logic
- `static/`: main app, login, and signed-out landing UI
- `admin_static/`: admin panel UI
- `data/state.json`: persisted users/settings/usage/feedback
- `create_admin.py`: helper to create/update admin users
- `recreate_main_admin.py`: one-command recovery/reset for the primary admin account
- `REPO_MAP.md`: deeper route/file map
- `CONFIGURATION.md`: config key reference and workflows
- `AGENTS.md`: project instructions/spec

## Useful commands

```bash
source .venv/bin/activate
python -m py_compile app.py create_admin.py recreate_main_admin.py
python create_admin.py
python recreate_main_admin.py --email william.wagg@icloud.com --name "William"
```

## Notes

- Keep installs inside `.venv` only.
- Passwords are stored hashed in `data/state.json`.
- User chats for signed-in users are stored encrypted in `data/state.json` (`userChats` payloads).
- If you edit `data/state.json` directly, restart the app after changes.
