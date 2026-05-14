from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app import models  # noqa: F401
from app.config import settings
from app.database import Base, engine
from app.routes import auth, health, users

app = FastAPI(
    title="Identity Vault API",
    description="FastAPI backend for Google OAuth identity storage and generated ID lookup.",
    version="1.0.0",
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY,
    same_site="none" if settings.is_production else "lax",
    https_only=settings.is_production,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "Identity Vault API is running",
        "environment": settings.ENVIRONMENT,
    }
