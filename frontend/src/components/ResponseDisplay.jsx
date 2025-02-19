import React from 'react';
import styled from 'styled-components';

const ResponseContainer = styled.div`
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const ResponseDisplay = ({ response }) => {
    return (
        <ResponseContainer>
            <pre>{response}</pre>
        </ResponseContainer>
    );
};

export default ResponseDisplay;