from ..core.config import conn
from ..core.auth import hash_password, verify_password, create_jwt_token, verify_google_token
from ..schemas.users import UserProfile, UserUrlResponse
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
    if stored_password_hash is None:
      cursor.close()
      raise HTTPException(status_code = 401, detail = "This account uses Google Login. Please sign in with Google.")

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
  cursor = conn.cursor()

  try:
    cursor.execute(
      """
        SELECT user_id, username, email, created_at
        FROM users
        WHERE user_id = %s
      """,
      (user_id,)
    )

    row = cursor.fetchone()

    if row is None:
      cursor.close()
      raise HTTPException(status_code=404, detail="User not found")

    cursor.close()

    return UserProfile(
      user_id=row[0],
      username=row[1],
      email=row[2],
      created_at=row[3]
    )

  # handle 404
  except HTTPException:
    raise

  # handle db errors
  except Exception as e:
    handle_error(e, cursor)

def get_my_urls(user_id):
  cursor = conn.cursor()

  try:
    cursor.execute(
      """
        SELECT url_id, url, short_code, times_visited, last_visited, created_at, updated_at
        FROM urls
        WHERE user_id = %s
        ORDER BY urls.created_at DESC
      """,
      (user_id,)
    )
    rows = cursor.fetchall()

    if not rows:
      cursor.close()
      return []

    cursor.close()

    result = []

    for row in rows:
      result.append(
        UserUrlResponse(
          url_id=row[0],
          url=row[1],
          short_code=row[2],
          times_visited=row[3],
          last_visited=row[4], 
          created_at=row[5],
          updated_at=row[6]
        )
      )

    return result

  except Exception as e:
    handle_error(e, cursor)

def google_login(google_token: str):
  cursor = conn.cursor()

  try:
    # verify token with google
    id_info = verify_google_token(google_token)

    if not id_info:
      cursor.close()
      raise HTTPException(status_code=401, detail="Invalid Google Token")
    
    email = id_info["email"]

    # check if user already exists
    cursor.execute(
      """
        SELECT user_id
        FROM users
        WHERE email = %s
      """,
      (email,)
    )
    row = cursor.fetchone()

    if row is None:
      # create user in DB if it doesnt exist
      cursor.execute(
        """
          INSERT INTO users(username, email, hashed_password, created_at)
          VALUES (%s, %s, %s, NOW())
          RETURNING user_id
        """,
        (email, email, None)
      )
      row = cursor.fetchone()
      conn.commit()

    user_id = row[0]

    # create JWT
    token = create_jwt_token(user_id)
    cursor.close()

    return {
      "access_token": token,
      "token_type": "bearer",
      "user_id": user_id
    }

  # handle 404
  except HTTPException:
    raise

  # handle db errors
  except Exception as e:
    handle_error(e, cursor)