from llama_index.core import Document, VectorStoreIndex, Settings, StorageContext
from llama_index.core.vector_stores import SimpleVectorStore
from llama_index.core.node_parser import SimpleNodeParser
import os
import uuid
from typing import Dict, Optional

class IndexingService:
    def __init__(self):
        self.indices: Dict[str, VectorStoreIndex] = {}
        self.node_parser = SimpleNodeParser.from_defaults(
            chunk_size = 256,
            chunk_overlap = 20,
            separator="\n\n"
        )


    async def create_index(self,content):
        try:

            os.makedirs("storage", exist_ok=True)
            text = content.get("text", "")

            # Ensure text is a string
            if isinstance(text, list):
                text = "\n".join(text)


            documents = [Document(
                    text= text,
                    metadata={
                    "source": "uploaded_pdf"
                }
            )]

            # Creating index
            index = VectorStoreIndex.from_documents(documents=documents,show_progress=True)
            # index = VectorStoreIndex.from_documents(documents)

            # Storing index with UUID
            index_id = str(uuid.uuid4())
            self.indices[index_id] = index

            # Save the index to disk
            index.storage_context.persist(persist_dir="storage")

            return {
                "index_id": index_id,
            }
        
        except Exception as e:
            raise Exception(f"Error creating index: {str(e)}")
        
        
        

    def get_index(self, index_id: str) -> Optional[VectorStoreIndex]:
        index = self.indices.get(index_id)
        if index:
            return index

        vector_store = SimpleVectorStore.from_persist_path("storage/vector_store.json")
        storage_context = StorageContext.from_defaults(vector_store=vector_store)
        index = VectorStoreIndex.load_from_disk(persist_dir="storage", storage_context=storage_context)
        if not index:
            raise ValueError(f"Index with id {index_id} not found")
        self.indices[index_id] = index
        return index