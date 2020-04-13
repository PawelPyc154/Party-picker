import React from 'react';
import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { Button } from '../../styledComponents';

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => (
  <NavigationContainer>
    <Logo>LOGO</Logo>
    <Button style={{ margin: '0 20px 0 auto' }}>
      <FaUserAltStyled />
      ZALOGUJ SIĘ
    </Button>
  </NavigationContainer>
);

export default Navigation;

const NavigationContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #202020;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  margin: 0 20px;
`;

const FaUserAltStyled = styled(FaUserAlt)`
  font-size: 20px;

  margin-right: 7px;
`;
