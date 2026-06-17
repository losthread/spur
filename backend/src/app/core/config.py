from dotenv import load_dotenv
import psycopg2
import os

# load env variables
load_dotenv()

# get DB URL
DATABASE_URL = os.getenv("DATABASE_URL")

# establish DB connection
conn = psycopg2.connect(DATABASE_URL)