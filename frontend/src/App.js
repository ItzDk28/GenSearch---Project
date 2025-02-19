import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import PDFUploader from './components/PDFUploader';
import QueryInput from './components/QueryInput';
import ResponseDisplay from './components/ResponseDisplay';

const AppContainer = styled.div`
  max-width: 1200pix;
  margin: 0 auto;
  padding: 2rem;
`;

const App = () => {
  const [indexId, setIndexId] = useState(null);
  const [response, setResponse] = useState('');

  const handleUpload = (data) => {
    setIndexId(data.index_id);
  };

  const handleQuery = (response) => {
    setResponse(response);
  };

  return (
    <ThemeProvider theme = {theme}>
      <GlobalStyles />
      <AppContainer>
        <h1>GenSearch</h1>
        <PDFUploader onUpload={handleUpload} />
        {indexId && <QueryInput onSubmit={handleQuery} indexId={indexId} />}
        {response && <ResponseDisplay response={response} />}
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;