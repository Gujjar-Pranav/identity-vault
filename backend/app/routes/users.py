import re

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.crud import get_user_by_generated_id
from app.database import get_db
from app.schemas import ApiResponse, UserResponse

router = APIRouter(prefix="/api", tags=["Users"])


GENERATED_ID_PATTERN = re.compile(r"^GID-[A-Z0-9]{8}$")


@router.get("/me", response_model=ApiResponse)
def get_current_user(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    user = get_user_by_generated_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return ApiResponse(
        success=True,
        message="Authenticated user found",
        data=UserResponse.model_validate(user),
    )


@router.get("/users/lookup/{generated_id}", response_model=ApiResponse)
def lookup_user_by_generated_id(
    generated_id: str,
    db: Session = Depends(get_db),
):
    normalized_id = generated_id.strip().upper()

    if not GENERATED_ID_PATTERN.match(normalized_id):
        return ApiResponse(
            success=False,
            message="Try Again",
            data=None,
        )

    user = get_user_by_generated_id(db, normalized_id)

    if not user:
        return ApiResponse(
            success=False,
            message="Try Again",
            data=None,
        )

    return ApiResponse(
        success=True,
        message="User found",
        data=UserResponse.model_validate(user),
    )