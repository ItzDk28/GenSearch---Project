import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ResponseContainer, MarkdownStyles } from './styles/ResponseStyles';

const ResponseDisplay = ({ response }) => {
    if (!response) return null;

    return (
        <ResponseContainer>
            <MarkdownStyles>
                <ReactMarkdown>{response}</ReactMarkdown>
            </MarkdownStyles>
        </ResponseContainer>
    );
};

export default ResponseDisplay;