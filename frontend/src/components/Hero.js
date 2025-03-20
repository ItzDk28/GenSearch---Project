import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  max-width: 700px;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const GetStartedButton = styled.button`
  background: white;
  color: #2b0a3d;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 12px 40px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Hero = ({ onGetStarted }) => (
  <HeroSection>
    <Title>GenSearch</Title>
    <Subtitle>
      An AI Tool That Helps Generate Custom Answers With Your Uploaded Material
    </Subtitle>
    <GetStartedButton onClick={onGetStarted}>
      Get Started
    </GetStartedButton>
  </HeroSection>
);

export default Hero;