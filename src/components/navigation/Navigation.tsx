import React from "react";
import styled from "styled-components";
import {Button} from "../../styledComponents";
import {FaUserAlt} from "react-icons/fa";

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => {
  return (
    <NavigationContainer>
      <Logo>LOGO</Logo>
      <Button>
        {/* <FaUserAltStyled /> */}
        ZALOGUJ SIĘ
      </Button>
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

const Logo = styled.div`
  margin: 0 20px;
`;

const FaUserAltStyled = styled(FaUserAlt)`
  font-size: 20px;
  color: #3498db;
  margin-right: 7px;
`;
