from fastapi import APIRouter

from app.config import settings

router = APIRouter(tags=["Health"])


@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "identity-vault-api",
        "environment": settings.ENVIRONMENT,
    }
