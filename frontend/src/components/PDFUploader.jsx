import React, { useState } from "react";
import styled from "styled-components";

const UploadContainer = styled.div`
  margin: 0 auto 2rem auto;
  padding: 2.5rem 2rem;
  background: linear-gradient(90deg, #2a0845 0%, #6441a5 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(44,0,80,0.18);
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadTitle = styled.h2`
  color: #fff;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 700;
`;

const UploadLabel = styled.label`
  display: inline-block;
  padding: 12px 32px;
  background: #7c4dff;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  &:hover {
    background: #512da8;
  }
`;

const FileName = styled.span`
  color: #fff;
  font-size: 1.1rem;
  vertical-align: middle;
  display: block;
  margin-top: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  background: #2d1457;
  border-radius: 8px;
  height: 18px;
  margin-top: 18px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  background: #7c4dff;
  height: 100%;
  transition: width 0.2s;
`;

const Label = styled.div`
  text-align: center;
  margin-top: 6px;
  color: #fff;
  font-size: 0.95rem;
`;

const PDFUploader = ({ onUpload }) => {
  const [progress, setProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setFileNames(files.map(f => f.name));
    setUploading(true);

    const formData = new FormData();
    files.forEach(file => formData.append("files", file)); // append all files at once

    const xhr = new window.XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/upload", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(files.reduce((acc, f) => ({ ...acc, [f.name]: percent }), {}));
      }
    };

    xhr.onloadend = () => {
      setUploading(false);
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (onUpload) onUpload(JSON.parse(xhr.responseText));
      }
    };

    xhr.send(formData);
  };

  return (
    <UploadContainer>
      <UploadTitle>Upload PDFs</UploadTitle>
      <UploadLabel>
        Choose Files
        <input
          type="file"
          name="files"
          accept="application/pdf"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </UploadLabel>
      <div style={{ width: "100%" }}>
        {fileNames.map(name => (
          <FileName key={name}>
            {name}
            {uploading && (
              <ProgressBar>
                <Progress progress={progress[name] || 0} />
              </ProgressBar>
            )}
            {uploading && <Label>{progress[name] || 0}%</Label>}
          </FileName>
        ))}
      </div>
    </UploadContainer>
  );
};

export default PDFUploader;