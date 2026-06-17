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