from fastapi import FastAPI, Request
from ..routes import users, urls
from ..crud.logs import log
from fastapi.middleware.cors import CORSMiddleware
import logging
import uvicorn

# create fastAPI instance - app tha uvicorn serves
app = FastAPI()

# include routes in app
app.include_router(users.router)
app.include_router(urls.router)

# CORS middleware
app.add_middleware(
  CORSMiddleware,
  allow_origins=['http://localhost:5173'],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

# Custom logging middleware
@app.middleware("http")
async def log_ip_middleware(request: Request, call_next):
  ip = request.client.host
  try:
    log(ip)

  except Exception as e:
    logging.error(f"Failed to log IP: {e}")
  
  return await call_next(request)

# run server
if __name__ == '__main__':
  print("Welcome to spur version 1.0.0")
  uvicorn.run("src.app.core.main:app", host = "0.0.0.0", port = 8000, reload = True)