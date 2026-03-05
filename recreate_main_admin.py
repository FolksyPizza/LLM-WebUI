import argparse
import json
from datetime import datetime, timezone
from getpass import getpass
from pathlib import Path
from uuid import uuid4

from werkzeug.security import generate_password_hash

BASE_DIR = Path(__file__).resolve().parent
DEFAULT_STATE_FILE = BASE_DIR / "data" / "state.json"


def normalize_email(value):
    return (value or "").strip().lower()


def utc_now():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def ensure_state_file(path):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        return
    path.write_text(
        json.dumps(
            {
                "users": [],
                "settings": {},
                "usage": {},
                "demoUsage": {},
                "feedback": [],
                "userChats": {},
            },
            indent=2,
        ),
        encoding="utf-8",
    )


def load_state(path):
    ensure_state_file(path)
    try:
        state = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Invalid JSON in {path}: {exc}") from exc
    if not isinstance(state, dict):
        raise RuntimeError(f"Unexpected state format in {path}: expected object")
    if not isinstance(state.get("users"), list):
        state["users"] = []
    return state


def save_state(path, state):
    tmp = path.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(state, indent=2), encoding="utf-8")
    tmp.replace(path)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Recreate/reset the main admin account in data/state.json"
    )
    parser.add_argument(
        "--email",
        default="william.wagg@icloud.com",
        help="Admin email to recreate (default: william.wagg@icloud.com)",
    )
    parser.add_argument(
        "--name",
        default="William",
        help="Display name for the admin account",
    )
    parser.add_argument(
        "--password",
        help="New password (if omitted, you will be prompted securely)",
    )
    parser.add_argument(
        "--state-file",
        default=str(DEFAULT_STATE_FILE),
        help=f"Path to state file (default: {DEFAULT_STATE_FILE})",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would change without writing to disk",
    )
    return parser.parse_args()


def main():
    args = parse_args()
    email = normalize_email(args.email)
    name = (args.name or "").strip()
    if not email:
        raise SystemExit("Error: --email is required")
    if not name:
        raise SystemExit("Error: --name cannot be empty")

    password = args.password
    if not password:
        password = getpass("New admin password: ").strip()
    if not password:
        raise SystemExit("Error: password cannot be empty")

    state_path = Path(args.state_file).resolve()
    state = load_state(state_path)
    users = state["users"]

    matches = [
        idx for idx, user in enumerate(users) if normalize_email(user.get("email")) == email
    ]
    target = None
    removed = 0
    if matches:
        target = users[matches[0]]
        for idx in reversed(matches[1:]):
            users.pop(idx)
            removed += 1
    else:
        target = {
            "id": f"user_{uuid4().hex}",
            "createdAt": utc_now(),
        }
        users.append(target)

    target["name"] = name
    target["email"] = email
    target["password"] = generate_password_hash(password)
    target["admin"] = True
    target["enabled"] = True
    target["rank"] = "Pro"
    target["pythonInterpreterEnabled"] = bool(target.get("pythonInterpreterEnabled", False))
    target["updatedAt"] = utc_now()

    if args.dry_run:
        print("[dry-run] No changes were written.")
    else:
        save_state(state_path, state)
        print(f"Saved admin account to {state_path}")

    print("Admin account is ready:")
    print(f"  email: {email}")
    print(f"  name: {name}")
    print("  admin: True")
    print("  rank: Pro")
    if removed:
        print(f"  removed duplicate accounts: {removed}")


if __name__ == "__main__":
    main()
