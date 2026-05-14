import secrets
import string


def generate_user_id() -> str:
    """
    Generate a short, readable, unique-looking user ID.

    Example:
    GID-8F4KQ2LA
    """
    alphabet = string.ascii_uppercase + string.digits
    random_part = "".join(secrets.choice(alphabet) for _ in range(8))
    return f"GID-{random_part}"
