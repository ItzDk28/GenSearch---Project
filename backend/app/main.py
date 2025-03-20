from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.services.pdf_service import PDFService
from app.services.indexing import IndexingService
from app.services.llm_service import LLMService
from app.config.settings import settings
import logging



class QueryRequest(BaseModel):
    query: str
    index_id: str

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

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
async def upload_pdf(file: UploadFile = File(...)):
    try:
        logger.debug(f"Received file: {file.filename}")
        
        content = await pdf_service.process_pdf(file)
        logger.debug(f"Processed PDF content length: {len(content.get('text', ''))}")
        
        index_data = await indexing_service.create_index(content)
        logger.debug(f"Created index with ID: {index_data.get('index_id')}")
        
        return index_data
    
    except Exception as e:
        logger.error(f"Error processing upload: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
    '''try:
        content = await pdf_service.process_pdf(file)
        index_data = await indexing_service.create_index(content)
        print(f"Debug - Created index: {index_data}")
        return index_data
    except Exception as e:
        return {"error" : str(e)}
    '''
    
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
