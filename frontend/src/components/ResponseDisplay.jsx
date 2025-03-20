import React from 'react';
import styled from 'styled-components';

const ResponseContainer = styled.div`
    margin: 20px;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Section = styled.div`
  margin: 15px 0;
  padding: 20px;
  background-color: white;
  border-left: 4px solid #0d6efd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  white-space: pre-wrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const SectionHeader = styled.div`
  font-weight: 600;
  color: #495057;
  margin-bottom: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #dee2e6;
`;

const Score = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const Content = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1rem;
  color: #212529;
`;

const ResponseDisplay = ({ response }) => {
    if (!response) return null;

    const sections = response.split('\n\n---\n\n');

    return (
        <ResponseContainer>
            {chunks.map((section, index) => {
                const [header, ...contentParts] = section.split('\n\n');
                const hasScore = contentParts[0].startsWith('Relevance Score:');
                const score = hasScore ? contentParts[0] : null;
                const content = hasScore ? contentParts.slice(1).join('\n\n') : contentParts.join('\n\n');
            
                return (
                    <Section key={index}>
                        <SectionHeader>{header}</SectionHeader>
                        {score && <Score>{score}</Score>}
                        <Content>{content}</Content>
                    </Section>
            );
        })}
        </ResponseContainer>
    );
};

export default ResponseDisplay;