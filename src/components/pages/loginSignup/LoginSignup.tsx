import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Scroll from 'react-scroll';
import styled from 'styled-components';
import { AppState } from '../../../state/allReducers';
import media from '../../../utils/MediaQueries';
import FbAndGoogle from './fbAndGoogle/FbAndGoogle';
import Login from './login/Login';
import Signup from './signup/Signup';

export interface LoginSignupProps {}

const LoginSignup: React.FC<LoginSignupProps> = () => {
  const [errorServerVisibleOn, setErrorServerVisibleOn] = useState('');

  // Scroll animation
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Scroll.animateScroll.scrollTo(container.current ? container.current.offsetTop - 5 : 0);
  }, []);

  const history = useHistory();
  const { user } = useSelector((state: AppState) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  return (
    <LoginSignupContainer ref={container}>
      <FbAndGoogle />
      <Login
        errorServerVisibleOn={errorServerVisibleOn}
        setErrorServerVisibleOn={setErrorServerVisibleOn}
      />
      <Signup
        errorServerVisibleOn={errorServerVisibleOn}
        setErrorServerVisibleOn={setErrorServerVisibleOn}
      />
    </LoginSignupContainer>
  );
};
export default LoginSignup;

const LoginSignupContainer = styled.main`
  overflow: hidden;
  background-color: #202020;
  margin-top: 10px;
  border: 1px solid #313131;
  ${media.tablet} {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: gray;
      outline: 1px solid gray;
    }
  }
`;
