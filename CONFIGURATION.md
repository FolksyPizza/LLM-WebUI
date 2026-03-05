# Configuration Guide

This project supports two configuration workflows:

1. Admin UI (recommended for day-to-day changes).
2. Direct file editing in `data/state.json` (recommended for bulk edits/backups).

## Admin UI Configuration

Open admin panel at `http://0.0.0.0:8180`.

- Standard controls:
  - Users, models, model providers, rank limits, demotion models, web search, UI name, demo model.
- Advanced controls:
  - **Raw Settings JSON** editor in admin:
    - `Reload JSON`: pulls the latest normalized settings from backend.
    - `Save JSON`: validates and writes the full settings object.

Raw settings API used by admin:
- `GET /api/system/raw`
- `POST /api/system/raw` with payload:
```json
{
  "settings": { "...full settings object..." }
}
```

## File-Based Configuration

Primary config file:
- `data/state.json`

Top-level layout:
- `users`: user accounts (hashed passwords)
- `settings`: app/system/model configuration
- `feedback`: user feedback entries
- `usage`, `demoUsage`: counters/quotas
- `userChats`: encrypted per-user chat payloads

Important `settings` keys:
- `uiName`: product/UI display name (default `LLM WebUI`)
- `models`: model list
  - Provider values: `local`, `ollama`, `openai`, `anthropic`, `google`
  - OpenAI-compatible fields: `openaiBaseUrl`, `openaiApiKey`, `openaiModel`
  - Anthropic fields: `anthropicBaseUrl`, `anthropicApiKey`, `anthropicModel`
  - Google fields: `googleBaseUrl`, `googleApiKey`, `googleModel`
- `activeModelId`: default signed-in model
- `demoModelId`: signed-out landing model
- `demoEnabled`, `demoLimits`
- `rankLimits`
- `demotionModelIds` (`Free`, `Plus`, `Pro`, `Demo`)
- `searchEnabled`, `searchAllowedRanks`, `searchMaxResults`
- `pythonInterpreterEnabled`: site-wide interpreter toggle
- `pythonInterpreterTimeoutSec`: execution timeout clamp (`1..30`)
- `pythonInterpreterMaxOutputChars`: output cap clamp (`1,000..120,000`)
- `ollamaServers`, `defaultOllamaServerId`, `ollamaUrl`

Recommended file-edit flow:
1. Stop the app.
2. Edit `data/state.json`.
3. Start the app (`python app.py`).
4. Open admin and use `Reload JSON` to verify normalized values.

Notes:
- Backend normalizes settings on load/save.
- Unknown or invalid values may be corrected during normalization.
- Signed-in chat history is encrypted at rest using `data/chat.key`.
