# Repo Map

## Top-Level
- `app.py`: Main Flask application factory, route registration, auth, inference, admin APIs, demo APIs, model/runtime helpers.
- `create_admin.py`: Utility script to create/update an admin account.
- `requirements.txt`: Python dependencies.
- `data/state.json`: Persistent JSON datastore (users, settings, feedback, usage, encrypted user chats).
- `AGENTS.md`: Ongoing agent instructions and product constraints.
- `INSTRUCTIONS.md`: Secondary implementation notes.
- `README.md`: Primary operational docs.
- `CONFIGURATION.md`: Configuration key map and admin/file workflows.

## Main UI (`static/`)
- `static/index.html`: Authenticated app shell (`/app`).
- `static/styles.css`: Main app styles.
- `static/app.js`: Main app behavior (chat, settings, models, streaming, markdown).
- `static/login.html`: Public login screen (`/login`) with in-place Sign In/Create Account toggle.
- `static/login.css`: Login page styles (single-color black theme).
- `static/login.js`: Login/signup client behavior and redirects.
- `static/demo.html`: Public demo screen (`/demo`).
- `static/demo.css`: Demo page styles.
- `static/demo.js`: Single-session demo infer flow + CTA behavior.
- `static/vendor/`: Frontend vendor assets (marked, DOMPurify, highlight, KaTeX).

## Admin UI (`admin_static/`)
- `admin_static/index.html`: Admin panel UI.
- `admin_static/styles.css`: Admin styles.
- `admin_static/admin.js`: Admin behavior (users/models/system/servers/feedback).

## Route Map (Main Server :8100)
- Page routes:
  - `/` -> public demo when unauthenticated, redirects to `/app` when authenticated
  - `/demo` -> alias of demo; redirects to `/app` when authenticated
  - `/login` -> public auth screen
  - `/app` -> authenticated app; redirects to `/` when unauthenticated
- Auth/user:
  - `POST /api/signup`
  - `POST /api/login`
  - `POST /api/logout`
  - `GET /api/me`
  - `POST /api/me/preferences`
  - `POST /api/me/delete`
  - `GET|POST /api/chats`
- Chat/runtime:
  - `POST /api/infer`
  - `GET /api/infer/stream`
  - `POST /api/python/execute` (gated by admin + user toggle)
  - `GET /api/search`
  - `GET|POST /api/feedback`
- Demo:
  - `GET /api/public-config`
  - `GET /api/demo/models`
  - `POST /api/demo/infer` (always uses admin-configured demo model)
  - `GET /api/demo/infer/stream`
- Admin/system/model/server endpoints are also registered but access-controlled by admin checks.
  - includes `GET /api/users/<user_id>/chats` for admin chat inspection

## Route Map (Admin Server :8180)
- `/` serves admin UI.
- Uses same backend API surface with admin checks (`Admin only`), including users, models, system, raw system config, ollama servers, feedback.

## Runtime / Ports
- Main UI + APIs: `0.0.0.0:8100`
- Admin UI + APIs: `0.0.0.0:8180`

## Python / Tools
- Virtualenv location: `.venv`
- Activate:
  - `source .venv/bin/activate`
- Install deps:
  - `pip install -r requirements.txt`
- Install extra package (always inside venv):
  - `pip install <package>`

## Quick Validation Commands
- Syntax check:
  - `python -m py_compile app.py create_admin.py`
- Run app:
  - `python app.py`
