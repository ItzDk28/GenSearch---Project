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

            retriever = VectorIndexRetriever(
                index=index,
                similarity_top_k=2,
                query_mode="default"
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

            logger.debug("Query Response: ")
            pprint_response(response)


            if not response or not response.response:
                return "No matching content found. Please try rephrasing your question."

            # Format prompt for structured response
            messages = [
                {
                    "role": "system",
                    "content": """You are a documentation expert. Format your answers using Markdown for clarity:
# Main Topic

*Subsection 1*

• Main point 1
  - Detail A
  - Detail B

*Subsection 2*

• Main point 2
  - Detail C
  - Detail D

> Important notes in blockquotes

Use:
- Single # for main headings
- *asterisks* for subsection titles
- • bullet points for main items
- - hyphens for sub-items
- > for important quotes"""           
                },
                {
                    "role": "user",
                    "content": f"""Based on the following content, provide a well-organized answer using Markdown formatting:

Question: {query}

Context:
{response.response}

Please ensure:
- Each main section starts with TWO newlines
- Each subsection has TWO newlines after the heading
- Each bullet point is on a new line
- There are empty lines between sections
- Lists are properly indented
"""
                }
            ]

            # Generate formatted response
            final_response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                temperature=0.3,
                max_tokens=800
            )

            return final_response.choices[0].message.content

        except Exception as e:
            logger.error(f"Error in generate_response: {str(e)}", exc_info=True)