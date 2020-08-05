/* eslint-disable react/jsx-one-expression-per-line */
import { motion } from 'framer-motion';
import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setLoginRegisterGoogleFb } from '../../../../state/auth/action';

export interface FbAndGoogleProps {}

const FbAndGoogle: React.FC<FbAndGoogleProps> = () => {
  const dispatch = useDispatch();

  const handleResponse = async (
    res: ReactFacebookLoginInfo | GoogleLoginResponse | GoogleLoginResponseOffline,
    strategy: string,
  ) => {
    if ('accessToken' in res) {
      await dispatch(setLoginRegisterGoogleFb(res, strategy));
    }
  };

  return (
    <FbAndGoogleContainer>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: [100, 0], opacity: [0, 1] }}
        transition={{ delay: 1.1, duration: 0.2 }}
      >
        <FacebookLogin
          appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
          autoLoad={false}
          fields="name,email,picture"
          callback={(res) => handleResponse(res, 'facebook')}
          cssClass="facebookLogin"
          icon={<FaFacebookSquareStyled />}
        />
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: [100, 0], opacity: [0, 1] }}
        transition={{ delay: 1, duration: 0.2 }}
      >
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_APP_ID}`}
          buttonText="Login with Google"
          onSuccess={(res) => handleResponse(res, 'google')}
          onFailure={(res) => handleResponse(res, 'google')}
          cookiePolicy="single_host_origin"
          isSignedIn={false}
          autoLoad={false}
          render={(renderProps) => (
            <GoogleLoginStyled type="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <FaGoogleStyled /> <p>Login with Google</p>
            </GoogleLoginStyled>
          )}
        />
      </motion.div>
    </FbAndGoogleContainer>
  );
};

export default FbAndGoogle;

const FbAndGoogleContainer = styled.section`
  width: auto;
  margin: 10px 5px 5px;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mq.md} {
    margin: 5vh auto 5px;
    max-width: 500px;
  }

  .facebookLogin {
    width: 100%;
    height: 35px;
    background-color: #415dae;
    border: none;
    margin: 0 0 15px 0;
    color: white;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const FaFacebookSquareStyled = styled(FaFacebookSquare)`
  justify-self: flex-start;
  position: absolute;
  top: calc(50% - 12px);
  left: 10px;
  font-size: 24px;
`;
const GoogleLoginStyled = styled.button`
  width: 100%;
  height: 35px;
  background-color: #d9534f;
  border: none;
  margin: 0 0 15px 0;
  color: white;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
`;
const FaGoogleStyled = styled(FaGoogle)`
  justify-self: flex-start;
  position: absolute;
  top: calc(50% - 12px);
  left: 10px;
  font-size: 24px;
`;
