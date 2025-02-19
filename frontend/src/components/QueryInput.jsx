import React, { useState } from 'react';
import styled from 'styled-components';

const QueryContainer = styled.div`
    margin: 2rem 0;
`;

const Input = styled.input`
    width: 100%;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const QueryInput = ({ onSubmit, indexId }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:8000/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    query,
                    index_id: indexID 
                }),
            });

            const data = await response.json();
            onSubmit(data.response);
        } catch(error) {
            console.error('Query Failed:', error);
        }
    };

    return (
        <QueryContainer>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder = "Ask anything..."
                />
            </form>
        </QueryContainer>
    );
};

export default QueryInput;