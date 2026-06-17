from fastapi import APIRouter, Depends
from ..crud import users as u
from ..schemas.users import UserLogin, UserRegister, UserProfile
from ..core.dependencies import get_user_id

router = APIRouter()

@router.post('/register')
async def register(user: UserRegister) -> dict:
  return u.register(user.username, user.email, user.password)

@router.post('/login')
async def login(user: UserLogin) -> dict:
  return u.login(user.email, user.password)

@router.get('/users/me')
async def get_user_info(user_id: int = Depends(get_user_id)) -> UserProfile:
  return u.get_user_info(user_id)