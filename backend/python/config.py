import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost/dbname")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # Vercel Sandbox Credentials
    VERCEL_TEAM_ID: str = os.getenv("VERCEL_TEAM_ID", "")
    VERCEL_PROJECT_ID: str = os.getenv("VERCEL_PROJECT_ID", "")
    VERCEL_TOKEN: str = os.getenv("VERCEL_TOKEN", "")

    # Sandbox Defaults
    DEFAULT_TIMEOUT_MS: int = 3600000  # 1 hour
    DEFAULT_EXPIRATION_MS: int = 7 * 24 * 60 * 60 * 1000  # 7 days

settings = Settings()
