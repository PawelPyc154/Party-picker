import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';
import styled from 'styled-components';
import { AppState } from '../../../state/allReducers';
import FbAndGoogle from './fbAndGoogle/FbAndGoogle';
import Login from './login/Login';
import Signup from './signup/Signup';

export interface LoginSignupProps {}

const LoginSignup: React.FC<LoginSignupProps> = () => {
  const [errorServerVisibleOn, setErrorServerVisibleOn] = useState('');
  const { user } = useSelector((state: AppState) => state.AuthReducer);

  // Scroll animation
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Scroll.animateScroll.scrollTo(container.current ? container.current.offsetTop - 50 : 0);
  }, []);

  return (
    <LoginSignupContainer ref={container}>
      {user && <Redirect to="/" />}
      <FbAndGoogle />
      <Login errorServerVisibleOn={errorServerVisibleOn} setErrorServerVisibleOn={setErrorServerVisibleOn} />
      <Signup errorServerVisibleOn={errorServerVisibleOn} setErrorServerVisibleOn={setErrorServerVisibleOn} />
    </LoginSignupContainer>
  );
};
export default LoginSignup;

const LoginSignupContainer = styled.main`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
  ${({ theme }) => theme.mq.md} {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.scrollbarThumb};
      outline: 1px solid ${({ theme }) => theme.colors.scrollbarThumb};
    }
  }
`;
