from fastapi import APIRouter, Depends
from ..crud import urls as u
from ..schemas.urls import URLCreate, URLDelete, URLLookupResponse, URLStatsResponse, URLUpdate, URLResponse
from ..core.dependencies import get_user_id

router = APIRouter()

# create short URL
@router.post('/shorten', response_model = URLResponse)
async def create_short_url(url: URLCreate, user_id: int = Depends(get_user_id)) -> URLResponse:
  return u.create_short_url(url.url, user_id)