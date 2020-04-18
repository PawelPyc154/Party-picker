import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import media from '../../../../../utils/MediaQueries';
import { setLogin, clearError } from '../../../../../state/auth/action';
import { AppState } from '../../../../../state/allReducers';
import Loading from '../../../loader/Loading';

export interface LoginPropsProps {}

const LoginProps: React.SFC<LoginPropsProps> = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: AppState) => state.AuthReducer);
  const [errorServerVisible, setErrorServerVisible] = useState(false);
  const [animationStop, setAnimationStop] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required').min(6, 'Too Short!'),
  });

  const handleChangeClearError = (
    e: React.ChangeEvent<any>,
    handleChange: (e: React.ChangeEvent<any>) => void,
  ) => {
    dispatch(clearError());
    handleChange(e);
  };

  return (
    <LoginContainer>
      <Formik
        validateOnChange
        validationSchema={validationSchema}
        initialValues={{
          email: 'elo@gmail.com',
          password: '123456',
        }}
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          setSubmitting(true);
          setErrorServerVisible(true);
          setAnimationStop(true);
          try {
            await dispatch(setLogin(email, password));
          } catch {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid }) =>
          isSubmitting ? (
            <Loading height={188} width={80} />
          ) : (
            <FromStyled>
              <Header
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.9, duration: 0.2 }}
              >
                Logowanie
              </Header>

              {errors.email && touched.email ? (
                <Validation>{errors.email}</Validation>
              ) : (
                errorServerVisible &&
                typeof error !== 'string' &&
                error?.email && <Validation>{error.email}</Validation>
              )}
              <Input
                autoComplete="off"
                style={errors.email && touched.email ? { border: '1px solid #e74c3c' } : {}}
                type="email"
                name="email"
                onChange={(e) => handleChangeClearError(e, handleChange)}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email *"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.8, duration: 0.2 }}
              />

              {errors.password && touched.password ? (
                <Validation>{errors.password}</Validation>
              ) : (
                errorServerVisible &&
                typeof error !== 'string' &&
                error?.password && <Validation>{error.password}</Validation>
              )}
              <Input
                autoComplete="off"
                style={errors.password && touched.password ? { border: '1px solid #e74c3c' } : {}}
                type="password"
                name="password"
                onChange={(e) => handleChangeClearError(e, handleChange)}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password *"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.7, duration: 0.2 }}
              />

              <Button
                style={
                  isValid && values.email && values.password
                    ? {
                        color: 'white',
                        border: '1px solid #3498db',
                        backgroundColor: isSubmitting ? '#3498db' : 'transparent',
                      }
                    : {}
                }
                disabled={isValid && isSubmitting}
                type="submit"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.6, duration: 0.2 }}
              >
                Wyślij
              </Button>
            </FromStyled>
          )
        }
      </Formik>
    </LoginContainer>
  );
};

export default LoginProps;

const LoginContainer = styled.section``;
const Header = styled(motion.h2)`
  margin-bottom: 10px;
`;
const FromStyled = styled(Form)`
  width: auto;
  margin: 10px 5px 5px;
  display: flex;
  flex-direction: column;

  ${media.tablet} {
    margin: 10px auto 5px;
    max-width: 500px;
  }
`;
const Input = styled(motion.input)`
  background: #181818;
  height: 40px;
  color: #3498db;
  margin: 0 0px 15px 0px;
  border: none;
  border: 1px solid #3498db;
  padding: 2px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
const Validation = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin: 0 0 5px 0;
`;

const Button = styled(motion.button)`
  background: #181818;
  color: #6f6f6f;
  font-size: 20px;
  border: 1px solid #6f6f6f;
  height: 35px;
  width: 20%;
  align-self: flex-end;
`;
