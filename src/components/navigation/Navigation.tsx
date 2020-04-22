import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { IoIosAdd } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import { setLogOut } from '../../state/auth/action';
import { AppState } from '../../state/allReducers';

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => {
  const { user } = useSelector((state: AppState) => state.AuthReducer);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogOut());
  };
  return (
    <NavigationContainer>
      <Logo>LOGO</Logo>
      <NavLinkContainer>
        <NavLinkStyled exact to="/" activeClassName="activeLink">
          wydarzenia
        </NavLinkStyled>
        <NavLinkStyled exact to="/contact" activeClassName="activeLink">
          kontakt
        </NavLinkStyled>
      </NavLinkContainer>

      {user ? (
        <UserLogin>
          <Tooltip title="Dodaj wydarzenie">
            <NavLinkUser exact to="/add-event" activeClassName="activeLink">
              <IoIosAddStyled />
            </NavLinkUser>
          </Tooltip>

          <Tooltip title="Wyloguj się">
            <LogOutButton type="button" onClick={handleLogout}>
              <GoSignOutStyled />
            </LogOutButton>
          </Tooltip>

          <Tooltip title={user.name}>
            <LogOutButton type="button">
              <FaUserAltStyled />
            </LogOutButton>
          </Tooltip>
        </UserLogin>
      ) : (
        <NavLinkLogInStyled exact to="/login-signup" activeClassName="activeLinkLogIn">
          <FaUserAltStyled style={{ marginRight: 7 }} />
          ZALOGUJ SIĘ
        </NavLinkLogInStyled>
      )}
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

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  background-color: transparent;
  border-radius: 0;
  height: 35px;
  padding: 10px 0;
  color: #3498db;
  margin: 0px 10px;
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
const UserLogin = styled.div`
  display: grid;

  margin: 0 20px 0 auto;
  grid-template-columns: repeat(3, 40px);
  grid-template-rows: 40px;
  grid-gap: 0 5px;
`;
const NavLinkUser = styled(NavLink)`
  border: none;
  border-radius: 20px;
  background-color: #181818;
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
  }
`;
const LogOutButton = styled.button`
  border: none;
  border-radius: 20px;
  background-color: #181818;
  color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

const FaUserAltStyled = styled(FaUserAlt)`
  font-size: 20px;
`;
const GoSignOutStyled = styled(GoSignOut)`
  font-size: 22px;
  margin: 5px 0 0 4px;
`;
const IoIosAddStyled = styled(IoIosAdd)`
  font-size: 30px;
`;
