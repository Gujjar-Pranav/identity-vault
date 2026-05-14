from sqlalchemy.orm import Session

from app.models import User
from app.utils.id_generator import generate_user_id


def get_user_by_google_id(db: Session, google_id: str) -> User | None:
    return db.query(User).filter(User.google_id == google_id).first()


def get_user_by_generated_id(db: Session, generated_id: str) -> User | None:
    return db.query(User).filter(User.generated_id == generated_id).first()


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def generate_unique_user_id(db: Session) -> str:
    while True:
        generated_id = generate_user_id()
        existing_user = get_user_by_generated_id(db, generated_id)

        if existing_user is None:
            return generated_id


def create_user(
    db: Session,
    google_id: str,
    name: str,
    email: str,
    profile_photo_url: str | None = None,
) -> User:
    user = User(
        generated_id=generate_unique_user_id(db),
        google_id=google_id,
        name=name,
        email=email,
        profile_photo_url=profile_photo_url,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_or_create_google_user(
    db: Session,
    google_id: str,
    name: str,
    email: str,
    profile_photo_url: str | None = None,
) -> User:
    existing_user = get_user_by_google_id(db, google_id)

    if existing_user:
        existing_user.name = name
        existing_user.email = email
        existing_user.profile_photo_url = profile_photo_url

        db.commit()
        db.refresh(existing_user)

        return existing_user

    return create_user(
        db=db,
        google_id=google_id,
        name=name,
        email=email,
        profile_photo_url=profile_photo_url,
    )
