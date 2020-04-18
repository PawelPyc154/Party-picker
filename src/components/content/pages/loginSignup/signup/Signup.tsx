import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import media from '../../../../../utils/MediaQueries';
import { setRegister, clearError } from '../../../../../state/auth/action';
import { AppState } from '../../../../../state/allReducers';

export interface SignupProps {}

const Signup: React.SFC<SignupProps> = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: AppState) => state.AuthReducer);

  const validationSchema = yup.object({
    name: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required').min(6, 'Too Short!'),
    password2: yup
      .string()
      .required('Required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const handleChangeClearError = (
    e: React.ChangeEvent<any>,
    handleChange: (e: React.ChangeEvent<any>) => void,
  ) => {
    dispatch(clearError());
    handleChange(e);
  };

  return (
    <SignupContainer>
      <Formik
        validateOnChange
        validationSchema={validationSchema}
        initialValues={{
          name: 'elo',
          email: 'elo@gmail.com',
          password: '123456',
          password2: '123456',
        }}
        onSubmit={async ({ name, email, password }, { setSubmitting, resetForm }) => {
          await setSubmitting(true);
          await dispatch(setRegister(name, email, password));
          if (!error) {
            await resetForm();
          }
          await setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid }) => (
          <FromStyled>
            <Header
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: [100, 0], opacity: [0, 1] }}
              transition={{ delay: 0.5, duration: 0.2 }}
            >
              Rejestracja
            </Header>
            {errors.name && touched.name ? (
              <Validation>{errors.name}</Validation>
            ) : (
              typeof error !== 'string' && error?.name && <Validation>{error.name}</Validation>
            )}
            <Input
              autoComplete="off"
              style={errors.name && touched.name ? { border: '1px solid #e74c3c' } : {}}
              type="email"
              name="email"
              onChange={(e) => handleChangeClearError(e, handleChange)}
              onBlur={handleBlur}
              value={values.name}
              placeholder="Nazwa użytkownika *"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: [100, 0], opacity: [0, 1] }}
              transition={{ delay: 0.4, duration: 0.2 }}
            />
            {errors.email && touched.email ? (
              <Validation>{errors.email}</Validation>
            ) : (
              typeof error !== 'string' && error?.email && <Validation>{error.email}</Validation>
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
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: [100, 0], opacity: [0, 1] }}
              transition={{ delay: 0.3, duration: 0.2 }}
            />
            {errors.password && touched.password ? (
              <Validation>{errors.password}</Validation>
            ) : (
              typeof error !== 'string' &&
              error?.password && <Validation>{error.password}</Validation>
            )}
            <Input
              autoComplete="off"
              style={errors.password && touched.password ? { border: '1px solid #e74c3c' } : {}}
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Password *"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: [100, 0], opacity: [0, 1] }}
              transition={{ delay: 0.2, duration: 0.2 }}
            />
            {errors.password2 && touched.password2 && <Validation>{errors.password2}</Validation>}
            <Input
              autoComplete="off"
              style={errors.password2 && touched.password2 ? { border: '1px solid #e74c3c' } : {}}
              type="password"
              name="password2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password2}
              placeholder="Potwierdz hasło *"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: [100, 0], opacity: [0, 1] }}
              transition={{ delay: 0.1, duration: 0.2 }}
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
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: [100, 0], opacity: [0, 1] }}
              transition={{ delay: 0, duration: 0.2 }}
            >
              Wyślij
            </Button>
          </FromStyled>
        )}
      </Formik>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.section``;
const Header = styled(motion.h2)`
  margin-bottom: 10px;
`;
const FromStyled = styled(Form)`
  width: auto;
  margin: 10px 5px 5px;
  display: flex;
  flex-direction: column;

  ${media.tablet} {
    margin: 0 auto 5px;
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
  margin: 0 0 50px;
`;
