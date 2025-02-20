from llama_index.core import Document, GPTVectorStoreIndex
import uuid
from llama_index.node_parser import SimpleNodeParser

class IndexingService:
    async def create_index(self,content):
        try:
            documents = [Document(text=content["text"] + "\n" + content["images_text"])]
            parser = SimpleNodeParser()
            nodes = parser.get_nodes_from_documents(documents)
            index = GPTVectorStoreIndex(nodes)

            index_id = str(uuid.uuid4())
            self.indices[index_id] = index

            return {"index_id": index_id}
        except Exception as e:
            raise Exception(f"Error creating index: {str(e)}")

    def get_index(self, index_id):
        index = self.indices.get(index_id)
        if not index:
            raise ValueError(f"Index with id {index_id} not found")
        return index
