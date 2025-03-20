import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import LoadingAnimation from './LoadingAnimation';

const UploadContainer = styled.div`
  padding: 2rem;
  border: 2px dashed #444;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  
  &:hover {
    border-color: #666;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Status = styled.p`
  margin-top: 1rem;
  color: ${props => props.error ? '#ff4444' : '#44ff44'};
`;

const PDFUploader = ({ onUpload }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    try {
      setIsUploading(true);
      setError('');
      setStatus('');

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      setStatus('Upload successful!');
      onUpload(data);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload PDF. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }
      handleUpload(file);
    }
  };

  return (
    <UploadContainer onClick={handleClick} style={{ cursor: isUploading ? 'default' : 'pointer' }}>
      {!isUploading ? (
        <h3>Click or drag PDF files here</h3>
      ) : (
        <LoadingAnimation />
      )}
      <FileInput
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {status && <Status>{status}</Status>}
      {error && <Status error>{error}</Status>}
    </UploadContainer>
  );
};
        


export default PDFUploader;