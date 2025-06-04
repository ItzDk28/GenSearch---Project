from pdf2image import convert_from_bytes
import pytesseract
import fitz  #PyMuPDF
from fastapi import UploadFile
import asyncio
from concurrent.futures import ThreadPoolExecutor, as_completed
import logging
from typing import Dict, Any
import time

logger = logging.getLogger(__name__)

class PDFService:
    def __init__(self):
        self.executor = ThreadPoolExecutor(max_workers=8)

    async def process_pdf(self,file: UploadFile):
        try:
            t0 = time.time()
            # Read the uploaded file content
            content = await file.read()
            t1 = time.time()

            # Trying normal text extraction
            # Run text extraction in thread pool
            text_content = await asyncio.get_event_loop().run_in_executor(
                self.executor,
                self._extract_text_sync,
                content
            )
            t2 = time.time()

            # No text found , trying OCR
            if not text_content.strip():
                logger.info("No text found in PDF, attempting OCR...")
                text_content = await asyncio.get_event_loop().run_in_executor(
                    self.executor,
                    self._extract_images_sync,
                    content
                )
            t3 = time.time()
            
            if isinstance(text_content, list):
                text_content = "\n".join(text_content)

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
            
            def extract_text_from_page(page):
                return page.get_text()
            
            with ThreadPoolExecutor(max_workers=8) as executor:
                texts = list(executor.map(extract_text_from_page, doc))
            
            doc.close()

            return "".join(texts)
        
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