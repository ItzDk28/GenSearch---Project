const API_BASE_URL = 'http://localhost:8000';

export const uploadPDF = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};

export const queryDocument = async (query, indexId) => {
    const response = await fetch('${API_BASE_URL}/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            index_id: indexId }),
    });
    return await response.json();
};