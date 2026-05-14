from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.config import settings
from app.crud import get_or_create_google_user
from app.database import get_db
from app.services.oauth import oauth

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.get("/google")
async def google_login(request: Request):
    redirect_uri = f"{settings.BACKEND_URL}/auth/google/callback"
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback")
async def google_callback(
    request: Request,
    db: Session = Depends(get_db),
):
    token = await oauth.google.authorize_access_token(request)
    user_info = token.get("userinfo")

    if not user_info:
        user_info = await oauth.google.userinfo(token=token)

    google_id = user_info.get("sub")
    name = user_info.get("name")
    email = user_info.get("email")
    profile_photo_url = user_info.get("picture")

    user = get_or_create_google_user(
        db=db,
        google_id=google_id,
        name=name,
        email=email,
        profile_photo_url=profile_photo_url,
    )

    request.session["user_id"] = user.generated_id

    return RedirectResponse(url=f"{settings.FRONTEND_URL}/dashboard")


@router.get("/logout")
def logout(request: Request):
    request.session.clear()
    return RedirectResponse(url=settings.FRONTEND_URL)
