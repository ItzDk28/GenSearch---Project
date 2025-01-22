# Importing the required libraries
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Document
from llama_index.core.settings import Settings
from llama_index.llms.openai import OpenAI
import os 
from dotenv import load_dotenv
import logging

# Configure Logging
logging.basicConfig(level = logging.INFO)
logger = logging.getLogger(__name__)

class RAGSystem:
    def __init__(self, openai_api_key, pdf_directory = "./data"):
        """
        Initializing the RAG system with OpenAI API key and directory containing PDFs
        """
        self.openai_api_key = openai_api_key
        self.pdf_directory = pdf_directory
        self.index = None
        self._setup_environment()

    def _setup_environment(self):
        """Setting up environment and configurations"""
        os.environ["OPENAI_API_KEY"] = self.openai_api_key

        # Configuring LLM
        self.llm = OpenAI(model = "gpt-3.5-turbo", temperature = 0.1)
        
        # Updating Global settings
        Settings.llm = self.llm
        Settings.chunk_size = 1024
        Settings.chunk_overlap = 20

    def load_documents(self):
        """Loading documents from specific directory"""
        try:
            logger.info(f"Loading Documents from {self.pdf_directory}")
            documents = SimpleDirectoryReader(self.pdf_directory).load_data()
            logger.info(f"Loaded {len(documents)} Documents")
            return documents
        except Exception as e:
            logger.error(f"Error Loading Documents: {e}")
            raise

    def build_index(self):
        """Building the vector store index from the documents"""
        try:
            documents = self.load_documents()
            logger.info("Building Index...")
            self.index = VectorStoreIndex.from_documents(
                documents,
            )
            logger.info("Index built successfully!")
        except Exception as e:
            logger.error(f"Error building index: {e}")
            raise

    def query(self, query_text):
        """
        Querying the index and returning response
        """
        if self.index is None:
            raise ValueError("Index not built. Please call build_index first.")
        
        try:
            logger.info(f"Processing Query: {query_text}")
            query_engine = self.index.as_query_engine()
            response = query_engine.query(query_text)
            return response
        except Exception as e:
            logger.error(f"Error Processing Query: {e}")
            raise
    
# Example usage function
def main():
    # Loading environment variables from .env file
    load_dotenv()

    # Initializing rag system
    rag = RAGSystem(
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        pdf_directory="./data"
    )

    # Building index
    rag.build_index()

    # Example Query
    query = "What is plant based diet"
    response = rag.query(query)
    print(f"\nQuery: {query}")
    print(f"Response: {response}")

if __name__ == "__main__":
    main()