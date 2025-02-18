import React, { useState } from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
    padding: 2rem;
    border: 2px dashed #ccc;
    border-radius: 8px;
    text-align: center;
    margin: 2rem 0;
`;

const PDFUploader = ({ onUpload }) => {
    const [dragging, setDragging] = useState(false);

    const handleDrop = async (e) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0];
        if (file?.type == 'application/pdf') {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:8000/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                onUpload(data);
            } catch (error) {
                console.error('Upload failed:', error);
            }
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
            style={{ background: dragging ? '#f0f0f0' : 'white' }}
        >
            <h3>Drag and drop your PDF here</h3>
            <p>or</p>
            <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        handleDrop({ preventDefault: () => {}, dataTranser: { files: [file] } });                        
                    }
                }}
            />
        </UploadContainer>
    );
};

export default PDFUploader;