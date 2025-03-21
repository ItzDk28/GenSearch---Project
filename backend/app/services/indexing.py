from llama_index.core import Document, VectorStoreIndex, Settings
from llama_index.core.node_parser import SimpleNodeParser

import uuid
from typing import Dict, Optional
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
class IndexingService:
    def __init__(self):
        self.indices: Dict[str, VectorStoreIndex] = {}
        self.node_parser = SimpleNodeParser.from_defaults(
            chunk_size = 512,
            chunk_overlap = 50
        )

        # Using HuggingFace for embedding
        Settings.embed_model = HuggingFaceEmbedding(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            device="cpu"
        )


    async def create_index(self,content):
        try:
            documents = [Document(
                text= content.get("text", "")
            )]

            # Create documents and parse into nodes
            #nodes = self.node_parser.get_nodes_from_documents(documents)

            # Creating index
            index = VectorStoreIndex.from_documents(documents)

            # Storing index with UUID
            index_id = str(uuid.uuid4())
            self.indices[index_id] = index

            return {
                "index_id": index_id,
            }
        
        except Exception as e:
            raise Exception(f"Error creating index: {str(e)}")

    def get_index(self, index_id: str) -> Optional[VectorStoreIndex]:
        index = self.indices.get(index_id)
        if not index:
            raise ValueError(f"Index with id {index_id} not found")
        return index
