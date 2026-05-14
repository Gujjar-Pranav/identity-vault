from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class UserResponse(BaseModel):
    generated_id: str
    google_id: str
    name: str
    email: str
    profile_photo_url: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[UserResponse] = None