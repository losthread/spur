from ..core.config import conn
from .exception import handle_error
from ..schemas.urls import URLResponse
from fastapi import HTTPException
from psycopg2.errors import UniqueViolation
import secrets
import string

def generate_short_code(length):
  alphabet = string.ascii_letters + string.digits
  short_code = ""

  for i in range(length):
    random_char = secrets.choice(alphabet)
    short_code += random_char

  return short_code

def create_short_url(url, user_id):
  # create cursor
  cursor = conn.cursor()

  try:
    # run while loop till generated url is duplicate
    while True:
      short_code = generate_short_code(7)

      try:
        cursor.execute(
          """
            INSERT INTO urls (user_id, url, short_code, created_at, updated_at)
            VALUES (%s, %s, %s, NOW(), NOW())
            RETURNING user_id, url_id, url, short_code, created_at, updated_at
          """,
          (user_id, url, short_code)
        )
        row = cursor.fetchone()
        conn.commit()

        break

      # if duplicate exists then change it
      except UniqueViolation:
        conn.rollback()
        continue

    cursor.close()

    return URLResponse(
        user_id=row[0],
        url_id=row[1],
        url=row[2],
        short_code=row[3],
        created_at=row[4],
        updated_at=row[5]
    )

  except Exception as e:
    handle_error(e, cursor)