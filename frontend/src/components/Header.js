import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const LoginButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
`;

const SignupButton = styled.button`
  padding: 8px 16px;
  background: white;
  color: #2b0a3d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
`;

const Header = () => (
  <HeaderContainer>
    <Logo>GenSearch</Logo>
    <AuthButtons>
      <LoginButton>LOG IN</LoginButton>
      <SignupButton>SIGN UP</SignupButton>
    </AuthButtons>
  </HeaderContainer>
);

export default Header;