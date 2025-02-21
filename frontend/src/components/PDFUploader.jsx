import React, { useState } from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
    padding: 2rem;
    border: 2px dashed #ccc;
    border-radius: 8px;
    text-align: center;
    margin: 2rem 0;
    transition: background-color 0.3s ease;
`;

const Input = styled.input`
    display: none;
`;

const UploadButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    marging-top: 1rem;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const PDFUploader = ({ onUpload }) => {
    const [dragging, setDragging] = useState(false);
    const[uploading, setUploading] = useState(false);

    const handleDrop = async (e) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer?.files?.[0];
        if (file?.type === 'application/pdf') {
            await uploadFile(file);
        }
    };

    const handleFileInput = async (e) => {
        const file = e.target?.files?.[0];
        if (file?.type === 'application/pdf') {
            await uploadFile(file);
        }
    };

    const uploadFile = async (file) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            onUpload(data);
        }   catch (error) {
            console.error('Upload failed:', error);
        }   finally {
            setUploading(false);
        }
    };

    return (
        <UploadContainer
            onDragOver= {(e) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave = {() => setDragging(false)}
            onDrop={handleDrop}
            style={{ 
                background: dragging ? '#f0f0f0' : 'white',
                opacity: uploading ? 0.6 : 1 
            }}
        >
            <h3>Drag and drop your PDF here</h3>
            <p>or</p>
            <input
                type="file"
                accept=".pdf"
                id="file-upload"
                onChange={handleFileInput}
            />
            <UploadButton onClick={() => document.getElementById('file-upload').click()}>
                Choose file
            </UploadButton>
            {uploading && <p>Uploading...</p>}
        </UploadContainer>
    );
};

export default PDFUploader;