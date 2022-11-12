from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHAMY_DATABASE_URL = 'sqlite:///./job_portal.db'
#SQLALCHAMY_DATABASE_URL = "postgresql://job_portal_admin:admin_job_portal@localhost/job_portal"
SQLALCHAMY_DATABASE_URL = "postgresql://ghnudoijmyfjst:8bb9d338c2c74d948e1eb97ce8e67f73a73c7b248a011f4edb8b3794b1bc2ac8@ec2-44-195-132-31.compute-1.amazonaws.com:5432/ddl8qb1htd49tj"

engine = create_engine(SQLALCHAMY_DATABASE_URL)

# engine = create_engine(SQLALCHAMY_DATABASE_URL, connect_args={
#                        "check_same_thread": False})   -- for sqlite

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False,)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
