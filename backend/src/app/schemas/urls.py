from pydantic import BaseModel
from datetime import datetime

# create short URL: POST /shorten url in body
class URLCreate(BaseModel):
  url: str

# update long URL: PUT /shorten url in body
class URLUpdate(BaseModel):
  url: str

# get url creation details after making it
class URLResponse(BaseModel):
  user_id: int
  url_id: int
  url: str
  short_code: str
  created_at: datetime
  updated_at: datetime
  
# visit short url to get info
class URLLookupResponse(BaseModel):
  url_id: int 
  url: str
  short_code: str
  created_at: datetime
  updated_at: datetime

# get stats about the url
class URLStatsResponse(BaseModel):
  url_id: int
  url: str
  short_code: str
  times_visited: int
  last_visited: datetime | None = None
  created_at: datetime
  updated_at: datetime