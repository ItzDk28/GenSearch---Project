from llama_index import ServiceContext
from llama_index.indices import VectorStoreIndex
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.llms import OpenAI
from config import settings

class LLMService:
    def __init__(self, indexing_service):
        self.llm = OpenAI(
            temperature=0,
            model=settings.MODEL_NAME,
            api_key=settings.OPENAI_API_KEY,
            api_version="2023-03-15-preview"
        )
        self.indexing_service = indexing_service
        self.service_context = ServiceContext.from_defaults(llm=self.llm)

    async def generate_response(self, query: str, index_id: str):
        try:
            # Getting the index using index_id 
            index = self.indexing_service.get_index(index_id)

            # Getting retriever from index
            retriever = index.as_retriever()

            # Creating query engine
            query_engine = RetrieverQueryEngine.from_args(
                retriever=retriever,
                service_context=self.service_context
            )

            # Generating response
            response = query_engine.query(query)
            return str(response)
        
        except Exception as e:
            raise Exception(f"Error generating response: {str(e)}")