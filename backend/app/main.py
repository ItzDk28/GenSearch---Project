from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.pdf_service import PDFService
from app.services.indexing import IndexingService
from app.services.llm_service import LLMService
from app.config.settings import settings
import logging
from app.config.logging import setup_logging
from typing import List

class QueryRequest(BaseModel):
    query: str
    index_id: str

# Configure logging
setup_logging
logger = logging.getLogger('app.main')

app = FastAPI(title=settings.PROJECT_NAME)

# Configuring CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pdf_service = PDFService()
indexing_service = IndexingService()
llm_service = LLMService(indexing_service)


@app.post("/upload")
async def upload_pdf(files: List[UploadFile] = File(...)):
    results = []
    for file in files:
        try:
            logger.debug(f"Received file: {file.filename}")
            content = await pdf_service.process_pdf(file)
            logger.debug(f"Processed PDF content length: {len(content.get('text', ''))}")
            index_data = await indexing_service.create_index(content)
            logger.debug(f"Created index with ID: {index_data.get('index_id')}")
            results.append({
                "filename": file.filename,
                "index_id": index_data.get("index_id"),
                "status": "success"
            })
        except Exception as e:
            logger.error(f"Error processing {file.filename}: {str(e)}", exc_info=True)
            results.append({
                "filename": file.filename,
                "error": str(e),
                "status": "failed"
            })
    return {"results": results}
    
    
@app.post("/query")
async def query_document(request: QueryRequest):
    try:
        response = await llm_service.generate_response(
            query=request.query,
            index_id=request.index_id
        )    
        return {"response": response}
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

