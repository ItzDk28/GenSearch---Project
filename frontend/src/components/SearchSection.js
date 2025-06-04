import React, { useState } from 'react';
import styled from 'styled-components';
import PDFUploader from './PDFUploader';
import QueryInput from './QueryInput';

const Section = styled.section`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 50px;
  padding: 20px;
`;

const Title = styled.h3`
  margin: 1.5rem 0 1rem;
  color: white;
`;

const ResponseContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const CustomSelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CustomLabel = styled.label`
  color: #fff;
  font-weight: 500;
  margin-right: 12px;
  font-size: 1.1rem;
`;

const CustomSelect = styled.select`
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  background: #2a0845;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(44,0,80,0.10);
  outline: none;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #3d1766;
  }
`;

const CustomOption = styled.option`
  background: #2a0845;
  color: #fff;
`;

const SearchSection = () => {
  const [indexIds, setIndexIds] = useState([]);
  const [selectedIndexId, setSelectedIndexId] = useState('');
  const [response, setResponse] = useState('');

  const handleUpload = (uploadResult) => {
    console.log('Upload result:', uploadResult);
    const ids = (uploadResult.results || [])
      .filter(r => r.status === "success")
      .map(r => ({ filename: r.filename, indexId: r.index_id }));
    setIndexIds(prev => {
      const existingIds = new Set(prev.map(item => item.indexId));
      const newIds = ids.filter(item => !existingIds.has(item.indexId));
      return [...prev, ...newIds];
    });
    if (ids.length > 0) setSelectedIndexId(ids[0].indexId);
  };

  const handleQuery = (queryResponse) => {
    setResponse(queryResponse);
  };

  return (
    <Section>
      <PDFUploader onUpload={handleUpload} />
      
      {indexIds.length > 0 && (
        <>
          <Title>Ask a Question</Title>
          <CustomSelectContainer>
            <CustomLabel>Select PDF:</CustomLabel>
            <CustomSelect
              value={selectedIndexId}
              onChange={e => setSelectedIndexId(e.target.value)}
            >
              {indexIds.map(({ filename, indexId }) => (
                <CustomOption key={indexId} value={indexId}>{filename}</CustomOption>
              ))}
            </CustomSelect>
          </CustomSelectContainer>
          <QueryInput onSubmit={handleQuery} index_id={selectedIndexId} />

          {response && (
            <ResponseContainer>
              <Title>Response</Title>
              <div>{response}</div>
            </ResponseContainer>
          )}
        </>
      )}
    </Section>
  );
};

export default SearchSection;