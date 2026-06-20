from pydantic import BaseModel, EmailStr, HttpUrl
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
  user_id: int
  username: str
  url_id: int
  url: HttpUrl
  short_code: str
  created_at: datetime