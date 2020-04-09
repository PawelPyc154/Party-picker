import React from "react";
import styled from "styled-components";

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => {
  return (
    <NavigationContainer>
      <Logo>LOGO</Logo>
      <Button>ZALOGUJ SIĘ</Button>
    </NavigationContainer>
  );
};

export default Navigation;

const NavigationContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #202020;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: 0 20px 0 auto;
`;
const Logo = styled.div`
  margin: 0 20px;
`;
