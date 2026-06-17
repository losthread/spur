from ..core.config import conn
from ..core.auth import hash_password, verify_password, create_jwt_token
from ..schemas.users import UserProfile
from .exception import handle_error
from fastapi import HTTPException

def register(username, email, password):
  # create cursor
  cursor = conn.cursor()

  try:  
    # hash the entered pass
    hashed_password = hash_password(password)

    cursor.execute(
      """
        INSERT INTO users(username, email, hashed_password, created_at)
        VALUES (%s, %s, %s, NOW())
        RETURNING user_id
      """,
      (username, email, hashed_password)
    )
    # fetch query results, commit and close
    row = cursor.fetchone()
    conn.commit()
    cursor.close()

    return {"user_id": row[0]}
  
  # handle DB errors (400, 409, 500)
  except Exception as e:
    handle_error(e, cursor)

def login(email, password):
  # create cursor
  cursor = conn.cursor()

  try:
    # check if user is registered
    cursor.execute(
      """
        SELECT user_id, hashed_password
        FROM users
        WHERE email = %s
      """,
      (email,)
    )
    # fetch query results
    row = cursor.fetchone()

    # is user isnt registered then return 401: unauthorized
    if row is None:
      conn.rollback()
      cursor.close()
      raise HTTPException(status_code = 401, detail = "Account is not registered! Register first")
    
    user_id = row[0]
    stored_password_hash = row[1]

    # verify password
    if not verify_password(password, stored_password_hash):
      cursor.close()
      raise HTTPException(status_code = 401, detail = "Email or password is incorrect")
    
    # create token
    token = create_jwt_token(user_id)
    cursor.close()

    return {
      "access_token": token,
      "token_type": "bearer",
      "user_id": user_id
    }
  
  # handle http 404
  except HTTPException:
    raise

  # handle DB errors
  except Exception as e:
    handle_error(e, cursor)

def get_user_info(user_id):
  # create cursor
  cursor = conn.cursor()

  cursor.execute(
    """
      SELECT user_id, username, email, created_at
      FROM users
      WHERE user_id = %s
    """,
    (user_id,)
  )
  row = cursor.fetchone()

  # row not found 404
  if row is None:
    conn.rollback()
    cursor.close()
    raise HTTPException(status_code = 404, detail = "User not found")
  
  cursor.close()

  user = UserProfile(
    user_id = row[0],
    username = row[1],
    email = row[2],
    created_at = row[3]
  )

  return user