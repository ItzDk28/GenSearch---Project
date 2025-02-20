import os 
from dotenv import load_dotenv

load_env()

class Settings:
    PROJECT_NAME = "Gensearch Ai"
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    MODEL_NAME = "gpt-3.5-turbo"
    EMBEDDING_MODEL = "text-embedding-ada-002"

settings = Settings()
