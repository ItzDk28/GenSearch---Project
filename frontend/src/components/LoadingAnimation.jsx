import React from 'react';
import styled, { keyframes } from 'styled-components';

const progressAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #007bff;
  border-radius: 10px;
  animation: ${progressAnimation} 2s ease-in-out infinite;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  color: #6c757d;
  font-size: 14px;
`;

const LoadingAnimation = () => (
    <Container>
        <ProgressBar>
            <Progress />
        </ProgressBar>
        <LoadingText>Uploading PDF...</LoadingText>
    </Container>
);

export default LoadingAnimation;