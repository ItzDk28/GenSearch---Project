from pdf2image import convert_from_bytes
import pytesseract
from PIL import Image
import io
import fitz  #PyMuPDF

class PDFService:
    async def process_pdf(self,file):
        content = await file.read()
        text_content = self._extract_text(content)
        images_content = self._extract_images(content)
        return {
            "text" : text_content,
            "images_text" : images_content
        }
    
    def _extract_text(self,content):
        doc = fitz.open(stream = content,filetype = pdf)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    
    def _extract_images(self,content):
        images = convert_from_bytes(content)
        extracted_text = ""
        for image in images:
            text = pytesseract.image_to_string(image)
            extracted_text += text + "\n"
        return extracted_text
