import os 
from dotenv import load_dotenv
from typing import ClassVar
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: ClassVar[str] = "Gensearch AI"
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    MODEL_NAME: str = os.getenv("MODEL_NAME", "gpt-4")
    BASE_URL: str = os.getenv("BASE_URL", "https://api.sree.shop/v1")

    class Config:
        env_file = ".env"

settings = Settings()
