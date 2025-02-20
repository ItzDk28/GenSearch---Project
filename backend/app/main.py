from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.pdf_service import PDFService
from app.services.indexing import IndexingService
from app.services.llm_service import LLMService

class QueryRequest(BaseModel):
    query: str
    index_id: str

app = FastAPI(title=settings.PROJECT_NAME)

# Configuring CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

pdf_service = PDFService()
indexing_service = IndexingService()
llm_service = LLMService()

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        content = await pdf_service.process_pdf(file)
        index_data = await indexing_service.create_index(content)
        return {"message" : "PDF Processed Successfully", "index_id" : index.id}
    except Exception as e:
        return {"error" : str(e)}
    
@app.post("/query")
async def query_document(query: str, index_id : str):
    try:
        response = await llm_service.generate_response(query, index_id)
        return {"response": response}
    except Exception as e:
        return {"error" : str(e)}
