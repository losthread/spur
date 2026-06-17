from fastapi import FastAPI
from ..routes import users
import uvicorn

# create fastAPI instance - app tha uvicorn serves
app = FastAPI()

# include routes in app
app.include_router(users.router)

# run server
if __name__ == '__main__':
  print("Welcome to spur version 1.0.0")
  uvicorn.run("src.app.core.main:app", host = "0.0.0.0", port = 8000, reload = True)