import React, { useState } from 'react';
import styled from 'styled-components';
import PDFUploader from './PDFUploader';
import QueryInput from './QueryInput';

const Section = styled.section`
  width: 100%;
  max-width: 800px;
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

const SearchSection = ({ indexId, onUpload }) => {
  const [response, setResponse] = useState('');

  const handleQuery = (queryResponse) => {
    setResponse(queryResponse);
  };

  return (
    <Section>
      <Title>Upload Files</Title>
      <PDFUploader onUpload={onUpload} />
      
      {indexId && (
        <>
          <Title>Ask a Question</Title>
          <QueryInput onSubmit={handleQuery} index_id={indexId} />
          
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