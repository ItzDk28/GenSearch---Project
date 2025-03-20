import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: auto;
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.2);
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
`;

const Title = styled.h4`
  margin-bottom: 15px;
  font-size: 1rem;
  color: white;
`;

const Link = styled.a`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  margin-bottom: 8px;
  font-size: 0.9rem;

  &:hover {
    color: white;
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <Column>
        <img src="/logo.svg" alt="GenSearch Logo" style={{ width: '150px', marginBottom: '10px' }} />
        <p>we create possibilities<br />for the connected world.</p>
      </Column>

      <Column>
        <Title>EXPLORE</Title>
        <Link href="#home">Home</Link>
        <Link href="#about">About</Link>
      </Column>

      <Column>
        <Title>FOLLOW</Title>
        <Link href="#instagram">Instagram</Link>
        <Link href="#twitter">Twitter</Link>
        <Link href="#linkedin">LinkedIn</Link>
      </Column>

      <Column>
        <Title>LEGAL</Title>
        <Link href="#terms">Terms</Link>
        <Link href="#privacy">Privacy</Link>
      </Column>
    </FooterContent>
  </FooterContainer>
);

export default Footer;