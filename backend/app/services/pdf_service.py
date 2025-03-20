from pdf2image import convert_from_bytes
import pytesseract
import fitz  #PyMuPDF
from fastapi import UploadFile
import asyncio
from concurrent.futures import ThreadPoolExecutor
import logging

logger = logging.getLogger(__name__)

class PDFService:
    def __init__(self):
        self.executor = ThreadPoolExecutor(max_workers=3)

    async def process_pdf(self,file: UploadFile):
        try:
            # Read the uploaded file content
            content = await file.read()

            # Trying normal text extraction
            # Run text extraction in thread pool
            text_content = await asyncio.get_event_loop().run_in_executor(
                self.executor,
                self._extract_text_sync,
                content
            )

            # No text found , trying OCR
            if not text_content.strip():
                logger.info("No text found in PDF, attempting OCR...")
                text_content = await asyncio.get_event_loop().run_in_executor(
                    self.executor,
                    self._extract_images_sync,
                    content
                )

            if not text_content.strip():
                raise Exception("No text found in PDF")
            
            logger.info(f"Extracter {len(text_content)} characters from PDF")
            return {
                "text" : text_content
            }
        
        except Exception as e:
            logger.error(f"Error processing PDF: {str(e)}")
            raise Exception(f"Error processing PDF: {str(e)}")
        
    def _extract_text_sync(self,content):
        try:                                           
            # Process PDF using PyMuPDF
            doc = fitz.open(stream=content, filetype="pdf") 
            text_content = ""
            
            # Extract text from each page
            for page in doc:
                text_content += page.get_text()
            
            doc.close()

            return text_content
        
        except Exception as e:
            logger.error(f"Error in text extraction: {str(e)}")
            return ""

    def _extract_images_sync(self,content):
        try:
            # Extracting text from scanned PDF using OCR
            images = convert_from_bytes(content, dpi=200)
            return " ".join(pytesseract.image_to_string(image) for image in images)

        except Exception as e:
            logger.error(f"Error in OCR: {str(e)}")
            return ""
