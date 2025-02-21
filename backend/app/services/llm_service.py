from llama_index.core import Settings
from llama_index.llms.openai import OpenAI
import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config.settings import settings

class LLMService:
    def __init__(self, indexing_service):
        Settings.llm = OpenAI(
            temperature=0,
            model=settings.MODEL_NAME,
            api_key=settings.OPENAI_API_KEY,
        )

        self.indexing_service = indexing_service

    async def generate_response(self, query: str, index_id: str) -> str:
        try:
            # Getting the index using index_id 
            index = self.indexing_service.get_index(index_id)

            # Creating query engine
            query_engine = index.as_query_engine()

            # Generating response
            response = query_engine.query(query)
            return str(response)
        
        except Exception as e:
            raise Exception(f"Error generating response: {str(e)}")