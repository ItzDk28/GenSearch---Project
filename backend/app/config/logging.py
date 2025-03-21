import logging
import sys
from pathlib import Path

def setup_logging():
    # Configure root logger
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout),  # Console handler
            logging.FileHandler('debug.log')    # File handler
        ],
        force=True  # Force reconfiguration of logging
    )

    # Set levels for specific loggers
    for logger_name in ['app', 'uvicorn', 'fastapi']:
        logging.getLogger(logger_name).setLevel(logging.DEBUG)