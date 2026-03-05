# Implementation Notes

This file is a practical snapshot of how the project is currently implemented.

## Runtime
- Main app: `0.0.0.0:8100`
- Admin app: `0.0.0.0:8180`
- Both are started from `python app.py`.

## Python Environment
- Use project venv:
  - `source .venv/bin/activate`
- Install dependencies in this venv only:
  - `pip install -r requirements.txt`

## Routing
- Signed-out default landing: `/`
- Public alias: `/demo`
- Auth route: `/login`
- Authenticated app: `/app`
- Redirect rules:
  - signed-in users on `/` or `/demo` -> `/app`
  - signed-out users on `/app` -> `/`

## Chat Persistence + Security
- Signed-in chats are stored server-side and encrypted at rest.
- Encryption key: `data/chat.key`
- Encrypted chat payload store: `data/state.json` -> `userChats`
- Chat APIs:
  - `GET|POST /api/chats`
  - `GET /api/users/<user_id>/chats` (admin only)

## Model Providers
- `local` (`.pt`)
- `ollama`
- `openai` (OpenAI-compatible `v1`, includes vLLM-style endpoints)
- `anthropic`
- `google`

## Admin UX Highlights
- Model editor supports:
  - `Main Model Name` and `Model Variant` display split.
  - Generation presets (`Focused`, `Balanced`, `Creative`, `Deterministic`, `Custom`).
  - Default max tokens = `4096`.
- Large integer inputs are comma-formatted for readability in admin (for example, `60,000`).
- Raw settings editor available in admin (`/api/system/raw`).

## UI Notes
- Admin and demo headers no longer show `ML` lettermark.
- Public landing greeting is positioned lower (closer to center).
- Main app dropdown keeps normal + legacy sections; experimental section removed from main model picker UI.

## Testing/Validation Commands
- Syntax:
  - `python -m py_compile app.py create_admin.py recreate_main_admin.py`
