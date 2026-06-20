from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError, VerifyMismatchError, InvalidHashError
from jwt import ExpiredSignatureError, InvalidTokenError
from google.oauth2 import id_token
from google.auth.transport import requests
import jwt 
import os

# load environment variables
load_dotenv()

# JWT AUTH
JWT_SECRET = os.getenv("JWT_KEY")
ALGORITHM = "HS256"

# instantiate password hashing object
ph = PasswordHasher()

# hash given password when registering
def hash_password(password: str) -> str:
  hashed_password = ph.hash(password)
  return hashed_password

# verify login password with stored hash in DB
def verify_password(password: str, stored_hash: str) -> bool:
  try:
    ph.verify(stored_hash, password)
    return True

  except (VerifyMismatchError, VerificationError, InvalidHashError):
    return False

# create JWT token and send to user
def create_jwt_token(user_id: int) -> str:

  payload = {
    "user_id": user_id,
    "exp": datetime.now(timezone.utc) + timedelta(days=7)
  }

  # encode the payload to create final token string
  token = jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)
  return token

# extract user_id from JWT received token
def decode_jwt_token(token: str):
  try:
    payload = jwt.decode(
      token,
      JWT_SECRET,
      algorithms=[ALGORITHM]
    )
    user_id = payload["user_id"]

    return user_id
  
  except ExpiredSignatureError:
    print("Token expired")
    return None

  except InvalidTokenError:
    print("Invalid token")
    return None
  

# GOOGLE OAuth2
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

def verify_google_token(token: str) -> dict | None:
  try:
    id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
    return id_info
  
  except Exception:
    return None