from fastapi import APIRouter, Depends, status, Response
from ..crud import urls as u
from ..schemas.urls import URLCreate, URLLookupResponse, URLStatsResponse, URLUpdate, URLResponse
from ..core.dependencies import get_user_id

router = APIRouter()

# create short URL
@router.post('/shorten', response_model = URLResponse)
async def create_short_url(url: URLCreate, user_id: int = Depends(get_user_id)) -> URLResponse:
  return u.create_short_url(url.url, user_id)
  
# retrieve original URL
@router.get('/go/{short_code}', response_model = URLLookupResponse)
async def retrieve_original_url(short_code: str) -> URLLookupResponse:
  return u.retrieve_original_url(short_code)

# update existing short url
@router.put('/shorten/{short_code}', response_model=URLResponse)
async def update_url(short_code: str, update: URLUpdate, user_id: int = Depends(get_user_id)) -> URLResponse:
  return u.update_url(short_code, update.url, user_id)

# delete existing short url
@router.delete('/shorten/{short_code}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_url(short_code: str, user_id: int = Depends(get_user_id)):
  u.delete_url(short_code, user_id)
  return Response(status_code = status.HTTP_204_NO_CONTENT)

# get short url stats
@router.get('/shorten/{short_code}/stats', response_model = URLStatsResponse)
async def get_url_stats(short_code, user_id: int = Depends(get_user_id)) -> URLStatsResponse:
  return u.get_url_stats(short_code, user_id)