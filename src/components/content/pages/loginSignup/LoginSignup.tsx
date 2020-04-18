import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Scroll from 'react-scroll';
import Login from './login/Login';
import Signup from './signup/Signup';
import FbAndGoogle from './fbAndGoogle/FbAndGoogle';
// import axiosWithBaseURL from '../../../../utils/axiosWithBaseURL';

export interface LoginSignupProps {}

const LoginSignup: React.SFC<LoginSignupProps> = () => {
  // Scroll animation
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Scroll.animateScroll.scrollTo(container.current ? container.current.offsetTop - 5 : 0);
  }, []);
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
      <Login />
      <Signup />
    </LoginSignupContainer>
  );
};
export default LoginSignup;

const LoginSignupContainer = styled.main`
  overflow: hidden;
`;
