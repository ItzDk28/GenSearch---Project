from llama_index.llms import openai
from llama_index.indices.query.schema import QueryMode
from config import settings

class LLMService:
    def __init__(self):
        self.llm = openai(model=settings.MODEL_NAME, api_key = settings.OPENAI_API_KEY)

    async def generate_response(self, query, index):
        query_engine = index.as_query_engine(
            llm = self.llm,
            mode = QueryMode.DEFAULT
        )
        response = query_engine.query(query)
        return str(response)
    