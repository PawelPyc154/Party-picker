import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Scroll from 'react-scroll';
import Login from './login/Login';
import Signup from './signup/Signup';
import FbAndGoogle from './fbAndGoogle/FbAndGoogle';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../state/allReducers';

export interface LoginSignupProps {}

const LoginSignup: React.SFC<LoginSignupProps> = () => {
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
    // const reqTest = async () => {
    //   const res = await axiosWithBaseURL.get('/auth/facebook');
    //   console.log(res);
    // };

    <LoginSignupContainer ref={container}>
      {/* <button type="button" onClick={() => reqTest()}>
        fb
      </button> */}
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
`;
