import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

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

const MarkdownStyles = styled.div`
  h1 {
        font-size: 24px;
        color: #2c3e50;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #eee;
    }

    em {
        display: block;
        font-size: 18px;
        color: #34495e;
        margin: 20px 0 10px 0;
    }

    ul {
        list-style: none;
        padding-left: 0;
        margin: 15px 0;
    }

    ul li {
        position: relative;
        padding-left: 20px;
        margin: 8px 0;
    }

    ul li:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #3498db;
    }

    ul li ul li:before {
        content: "-";
    }

    blockquote {
        margin: 20px 0;
        padding: 10px 20px;
        background: #f8f9fa;
        border-left: 4px solid #3498db;
        color: #2c3e50;
    }
`;

const ResponseDisplay = ({ response }) => {
    if (!response) return null;

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
                        <MarkdownStyles>
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </MarkdownStyles>
                    </Section>
                );
            })}
        </ResponseContainer>
    );
};

export default ResponseDisplay;