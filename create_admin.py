import json
from datetime import datetime
from pathlib import Path
from uuid import uuid4

from werkzeug.security import generate_password_hash

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
STATE_FILE = DATA_DIR / "state.json"


def ensure_storage():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not STATE_FILE.exists():
        STATE_FILE.write_text(
            json.dumps(
                {
                    "users": [],
                    "settings": {
                        "modelPath": "",
                        "maxNewTokens": 4096,
                        "temperature": 0.7,
                        "topP": 0.9,
                        "uiName": "LLM WebUI",
                        "pythonInterpreterEnabled": False,
                        "pythonInterpreterTimeoutSec": 6,
                        "pythonInterpreterMaxOutputChars": 12000,
                    },
                },
                indent=2,
            )
        )


def load_state():
    ensure_storage()
    return json.loads(STATE_FILE.read_text())


def save_state(state):
    ensure_storage()
    STATE_FILE.write_text(json.dumps(state, indent=2))


def prompt(label):
    value = ""
    while not value:
        value = input(label).strip()
    return value


def main():
    print("Create or update an admin account")
    name = prompt("Name or username: ")
    email = prompt("Email: ").lower()
    password = prompt("Password: ")

    state = load_state()
    existing = next((u for u in state["users"] if u.get("email") == email), None)
    if existing:
        existing["name"] = name
        existing["password"] = generate_password_hash(password)
        existing["admin"] = True
        existing["enabled"] = True
        existing["rank"] = "Pro"
        existing["pythonInterpreterEnabled"] = False
        print("Updated existing user to admin.")
    else:
        user = {
            "id": f"user_{uuid4().hex}",
            "name": name,
            "email": email,
            "password": generate_password_hash(password),
            "admin": True,
            "enabled": True,
            "rank": "Pro",
            "pythonInterpreterEnabled": False,
            "createdAt": datetime.utcnow().isoformat() + "Z",
        }
        state["users"].append(user)
        print("Created new admin user.")

    save_state(state)
    print("Saved to data/state.json")


if __name__ == "__main__":
    main()
