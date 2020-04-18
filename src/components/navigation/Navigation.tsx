import React from 'react';
import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => (
  <NavigationContainer>
    <Logo>LOGO</Logo>
    <NavLinkContainer>
      <NavLinkStyled exact to="/" activeClassName="activeLink">
        home
      </NavLinkStyled>
      <NavLinkStyled exact to="/contact" activeClassName="activeLink">
        kontakt
      </NavLinkStyled>
    </NavLinkContainer>
    <NavLinkLogInStyled exact to="/login-signup" activeClassName="activeLinkLogIn">
      <FaUserAltStyled />
      ZALOGUJ SIĘ
    </NavLinkLogInStyled>
  </NavigationContainer>
);
export default Navigation;

const NavigationContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #202020;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  .activeLink {
    color: white;
  }
  .activeLinkLogIn {
    border: 1px solid white;
    color: white;
  }
`;
const NavLinkContainer = styled.div``;

const Logo = styled.div`
  margin: 0 20px;
  letter-spacing: 2px;
`;

const FaUserAltStyled = styled(FaUserAlt)`
  font-size: 20px;
  margin-right: 7px;
`;
const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  background-color: transparent;
  border-radius: 0;
  height: 35px;
  padding: 0px;
  color: #3498db;
  margin: 0 10px;

  cursor: pointer;
  &:hover {
    color: white;
  }
`;
const NavLinkLogInStyled = styled(NavLink)`
  text-decoration: none;
  background-color: transparent;
  border: 1px solid #3498db;
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: #3498db;
  margin: 0 20px 0 auto;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    border: 1px solid white;
    color: white;
  }
`;
