import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import SearchSection from './components/SearchSection';

const AppContainer = styled.div`
  background-color: #000000;
  background-image: 
    radial-gradient(
      circle at left,
      rgba(61, 0, 153, 0.6) 0%,
      rgba(32, 0, 80, 0.2) 20%,
      rgba(0, 0, 0, 0) 60%
    ),
    radial-gradient(
      circle at right,
      rgba(128, 0, 255, 0.8) 0%,
      rgba(80, 0, 180, 0.3) 40%,
      rgba(0, 0, 0, 0) 70%
    );
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [indexId, setIndexId] = useState(null);

  const handleUpload = (data) => {
    if (data.results && data.results.length > 0) {
      // console.log('Setting index ID:', data.index_id); // For debugging
      setIndexId(data.results[0].index_id);
      setShowSearch(true);
    }
    //setResponse('');   // Clear previous response
  };

  const handleGetStarted = () => {
    setShowSearch(true);
    window.scrollTo({
      top: document.querySelector('.search-section')?.offsetTop,
      behavior: 'smooth'
    });
  };

  //const handleQuery = (response) => {
  //  setResponse(response);
  //};

  return (
    <AppContainer>
      <Header />
      <main>
        <Hero onGetStarted={handleGetStarted} />
        {showSearch && (
          <SearchSection 
            indexId={indexId}
            onUpload={handleUpload}
          />
        )}
        <Features />
      </main>
      <Footer />
    </AppContainer>
  );
}

export default App;