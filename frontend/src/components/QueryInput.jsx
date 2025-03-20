import React, { useState } from 'react';
import styled from 'styled-components';

const QueryContainer = styled.form`
    margin: 2rem 0;
`;

const Input = styled.input`
    width: 100%;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 1rem;
`;

const QueryInput = ({ onSubmit, index_id }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    query,
                    index_id 
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            onSubmit(data.response);
            setQuery('')  // Clear the input field
        } catch(error) {
            console.error('Query Failed:', error);
            setError('Failed to get response. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <QueryContainer onSubmit={handleSubmit}>
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder = "Ask a question..."
                disabled={loading}
                required
            />
            <Button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Ask Question'}
            </Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </QueryContainer>
    );
};

export default QueryInput;