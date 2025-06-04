from llama_index.core import Settings
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.postprocessor import SimilarityPostprocessor
from llama_index.core.response import Response
from llama_index.core.response.pprint_utils import pprint_response
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
            api_key=settings.OPENAI_API_KEY
        )


        self.indexing_service = indexing_service

    async def generate_response(self, query: str, index_id: str) -> str:
        try:
            # Getting the index using index_id 
            index = self.indexing_service.get_index(index_id)

            retriever = VectorIndexRetriever(
                index=index,
                similarity_top_k=1,
            )
            
            postprocessor = SimilarityPostprocessor(
                similarity_cutoff = 0.7
            )

            # Creating query engine
            
            query_engine = RetrieverQueryEngine(
                retriever=retriever,
                node_postprocessors=[postprocessor]
            )
            

            logger.debug(f"Querying index with: {query}")
            response = query_engine.query(query)

            similarity_score = None
            if response.source_nodes and len(response.source_nodes) > 0:
                node = response.source_nodes[0]
                similarity_score = node.score

            # Log similarity score
            logger.info(f"Similarity score: {similarity_score}")
            print(f"Similarity score: {similarity_score}")

            pprint_response(response)
            
            if not response or not response.response:
                return "Sorry, I couldn't find any relevant information."
           
        except Exception as e:
            logger.error(f"Error in generate_response: {str(e)}", exc_info=True)
            raise

        return (f"Response: {response.response} \n\n")
