import styled from 'styled-components';

export const ResponseContainer = styled.div`
    margin: 20px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const MarkdownStyles = styled.div`
    h1 {
        font-size: 24px;
        color: #2c3e50;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #eee;
    }

    h2 {
        font-size: 18px;
        color: #34495e;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    em {
        display: block;
        font-style: italic;
        color: #7f8c8d;
        margin: 10px 0;
    }

    hr {
        border: none;
        border-bottom: 1px solid #eee;
        margin: 15px 0;
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
        line-height: 1.6;
    }

    ul li:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #3498db;
    }

    blockquote {
        margin: 20px 0;
        padding: 10px 20px;
        background: #f8f9fa;
        border-left: 4px solid #3498db;
        color: #2c3e50;
        font-style: italic;
    }

    /* Accuracy styling */
    .accuracy-high {
        color: #27ae60;
    }

    .accuracy-medium {
        color: #f39c12;
    }

    .accuracy-low {
        color: #e74c3c;
    }
`;