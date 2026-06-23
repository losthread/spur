from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserRegister(BaseModel):
  username: str
  email: EmailStr
  password: str

class UserLogin(BaseModel):
  email: EmailStr
  password: str

class UserProfile(BaseModel):
  user_id: int
  username: str
  email: EmailStr
  created_at: datetime

class UserUrlResponse(BaseModel):
  url_id: int
  url: str
  short_code: str
  times_visited: int
  last_visited: datetime | None = None
  created_at: datetime
  updated_at: datetime

class GoogleLoginRequest(BaseModel):
  token: str