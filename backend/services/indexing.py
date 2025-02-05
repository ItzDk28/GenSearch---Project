from llama_index.core import Document, GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index.node_parser import SimpleNodeParser

class IndexingService:
    async def create_index(self,content):
        documents = [Document(text=content["text"] + "\n" + content["images_text"])]
        parser = SimpleNodeParser()
        nodes = parser.get_nodes_from_documents(documents)
        index = GPTVectorStoreIndex(nodes)
        return index
