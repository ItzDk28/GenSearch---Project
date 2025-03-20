from llama_index.core import Settings
from openai import OpenAI
import sys
import os
import logging
import asyncio

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config.settings import settings

logger = logging.getLogger(__name__)

class LLMService:
    def __init__(self, indexing_service):

        self.client = OpenAI(
            base_url="https://api.sree.shop/v1",
            api_key=settings.OPENAI_API_KEY
        )

        '''Settings.llm = OpenAI(
            temperature=0.7,
            model="gpt-4o",
            api_key=settings.OPENAI_API_KEY,
            api_base=settings.BASE_URL,
            max_tokens=512,
        )'''

        self.indexing_service = indexing_service

    async def generate_response(self, query: str, index_id: str) -> str:
        try:
            # Getting the index using index_id 
            index = self.indexing_service.get_index(index_id)

            # Creating query engine
            query_engine = index.as_query_engine(
                response_mode="no_text",
                streaming=False,
                similarity_top_k=1,
                similarity_cutoff=0.5
            )

            logger.debug(f"Querying index with: {query}")
            retrieval_results = query_engine.retrieve(query)
            
            logger.debug(f"Retrieved {len(retrieval_results)} text chunks")
            if len(retrieval_results) == 0:
                return "No matching content found. Please try rephrasing your question."

            # Get the single most relevant result
            node = retrieval_results[0]
            text_content = node.text.strip()
            score = getattr(node, 'score', 'N/A')

            # Format the response
            response = f"Most Relevant Answer (Similarity: {score:.2f}):\n\n{text_content}"
            
            return response

            '''messages = [
                {"role": "system", "content": "You are a helpful assistant. Use the provided context to answer questions."},
                {"role": "user", "content": f"Context: {context}\n\nQuestion: {query}"}
            ]
            
            # Generating response
            loop = asyncio.get_running_loop()

            response = await loop.run_in_executor(
                None,
                lambda: self.client.chat.completions.create(
                    model="gpt-4o",
                    messages=messages,
                    temperature=0.7
                )
            )

            return response.choices[0].message.content
        '''
        
        except Exception as e:
            logger.error(f"Error in generate_response: {str(e)}", exc_info=True)
            raise