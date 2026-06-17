from ..core.config import conn
from psycopg2.errors import UniqueViolation, ForeignKeyViolation
from fastapi import HTTPException, status

# rxception handling helper function
def handle_error(e, cursor):
  # undo DB chages on error
  conn.rollback()
  cursor.close()

  # If Data already exists
  if isinstance(e, UniqueViolation):
    raise HTTPException(status_code = status.HTTP_409_CONFLICT, detail = "User already exists")
  
 # Invalid reference error, data does not exist
  elif isinstance(e, ForeignKeyViolation):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid reference")
  
  # Internal server error
  else:
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")