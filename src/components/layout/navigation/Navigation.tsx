import { Switch, Tooltip } from '@material-ui/core';
import React, { useContext } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { IoIosAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../../context/StyleVariable';
import { AppState } from '../../../state/allReducers';
import { setLogOut } from '../../../state/auth/action';

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => {
  const { user } = useSelector((state: AppState) => state.AuthReducer);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogOut());
  };

  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const handleChangeDarkMode = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem('isDarkMode', JSON.stringify(!prev));
      return !prev;
    });
  };
  return (
    <NavigationContainer>
      <Logo>LOGO</Logo>
      <NavLinkContainer>
        <NavLinkStyled exact to="/" activeClassName="activeNavLink">
          Wydarzenia
        </NavLinkStyled>
        <NavLinkStyled exact to="/contact" activeClassName="activeNavLink">
          Kontakt
        </NavLinkStyled>
      </NavLinkContainer>
      <SwitchStyled checked={isDarkMode} onChange={handleChangeDarkMode} color="primary" name="checkedB" />
      {user ? (
        <UserLogin>
          <Tooltip title="Dodaj wydarzenie">
            <NavLinkUser exact to="/add-event" activeClassName="activeNavLink">
              <IoIosAddStyled />
            </NavLinkUser>
          </Tooltip>

          <Tooltip title="Wyloguj się">
            <LogOutButton type="button" onClick={handleLogout}>
              <GoSignOutStyled />
            </LogOutButton>
          </Tooltip>
        </UserLogin>
      ) : (
        <>
          <NavLinkLogInStyled exact to="/login-signup" activeClassName="activeNavLinkLogIn">
            <FaUserAltStyled style={{ marginRight: 7 }} />
            ZALOGUJ SIĘ
          </NavLinkLogInStyled>
        </>
      )}
    </NavigationContainer>
  );
};
export default Navigation;

const NavigationContainer = styled.nav`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  border: 1px solid ${(props) => props.theme.colors.borderPrimary};
  .activeNavLink {
    color: ${(props) => props.theme.colors.activeNavLink};
  }
  .activeNavLinkLogIn {
    border: 1px solid ${(props) => props.theme.colors.activeNavLink};
    color: ${(props) => props.theme.colors.activeNavLink};
  }
`;
const NavLinkContainer = styled.div``;

const Logo = styled.div`
  margin: 0 20px;
  letter-spacing: 2px;
  display: none;
  ${({ theme }) => theme.mq.md} {
    display: initial;
  }
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  background-color: transparent;
  border-radius: 0;
  height: 35px;
  padding: 10px 0;
  color: ${(props) => props.theme.colors.layout};
  margin: 0px 10px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.hover};
  }
`;

const NavLinkLogInStyled = styled(NavLink)`
  text-decoration: none;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.layout};
  border-radius: 0;
  height: 35px;
  padding: 5px;
  color: ${({ theme }) => theme.colors.layout};
  margin: 0 5px 0 auto;
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  ${({ theme }) => theme.mq.md} {
    margin: 0 20px 0 auto;
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.hover};
  }
`;

const UserLogin = styled.div`
  display: grid;
  margin: 0 20px 0 auto;
  grid-template-columns: repeat(2, 40px);
  grid-template-rows: 40px;
  grid-gap: 0 5px;
`;

const NavLinkUser = styled(NavLink)`
  border: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.layout};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: ${({ theme }) => theme.colors.hover};
  }
`;

const LogOutButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.layout};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.hover};
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

const SwitchStyled = styled(Switch)`
  && .MuiSwitch-thumb {
    background-color: ${({ theme }) => theme.colors.switch.thumb};
  }
  && :checked + .MuiSwitch-thumb {
    background-color: ${({ theme }) => theme.colors.switch.thumbChecked};
  }
  && .MuiSwitch-track {
    background-color: ${({ theme }) => theme.colors.switch.track};
  }
  && .Mui-checked + .MuiSwitch-track {
    background-color: ${({ theme }) => theme.colors.switch.trackChecked};
  }
`;
