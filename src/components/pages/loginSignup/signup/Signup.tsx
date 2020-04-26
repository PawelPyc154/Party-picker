import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import * as yup from 'yup';
import { AppState } from '../../../../state/allReducers';
import { clearError, setRegister } from '../../../../state/auth/action';
import media from '../../../../utils/MediaQueries';
import Loading from '../../../universalComponents/Loading';

export interface SignupProps {
  errorServerVisibleOn: string;
  setErrorServerVisibleOn: Dispatch<SetStateAction<string>>;
}

const Signup: React.FC<SignupProps> = ({ errorServerVisibleOn, setErrorServerVisibleOn }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: AppState) => state.AuthReducer);

  const [animationStop, setAnimationStop] = useState(false);

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
          name: '',
          email: '',
          password: '',
          password2: '',
        }}
        onSubmit={async ({ name, email, password }, { setSubmitting }) => {
          setSubmitting(true);
          setErrorServerVisibleOn('signup');
          setAnimationStop(true);
          try {
            await dispatch(setRegister(name, email, password));
          } catch {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid }) =>
          isSubmitting ? (
            <div style={{ height: 360 }}>
              <Loading height={80} width={80} />
            </div>
          ) : (
            <FromStyled>
              <Header
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.5, duration: 0.2 }}
              >
                Rejestracja
              </Header>
              {errors.name && touched.name ? (
                <Validation>{errors.name}</Validation>
              ) : (
                errorServerVisibleOn === 'signup' &&
                typeof error !== 'string' &&
                error?.name && <Validation>{error.name}</Validation>
              )}
              <Input
                autoComplete="nope"
                style={errors.name && touched.name ? { border: '1px solid #e74c3c' } : {}}
                type="text"
                name="name"
                onChange={(e) => handleChangeClearError(e, handleChange)}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Nazwa użytkownika *"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.4, duration: 0.2 }}
              />
              {errors.email && touched.email ? (
                <Validation>{errors.email}</Validation>
              ) : (
                errorServerVisibleOn === 'signup' &&
                typeof error !== 'string' &&
                error?.email && <Validation>{error.email}</Validation>
              )}
              <Input
                autoComplete="nope"
                style={errors.email && touched.email ? { border: '1px solid #e74c3c' } : {}}
                type="email"
                name="email"
                onChange={(e) => handleChangeClearError(e, handleChange)}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email *"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.3, duration: 0.2 }}
              />
              {errors.password && touched.password ? (
                <Validation>{errors.password}</Validation>
              ) : (
                errorServerVisibleOn === 'signup' &&
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
                transition={{ delay: 0.2, duration: 0.2 }}
              />
              {errors.password2 && touched.password2 && <Validation>{errors.password2}</Validation>}
              <Input
                autoComplete="off"
                style={errors.password2 && touched.password2 ? { border: '1px solid #e74c3c' } : {}}
                type="password"
                name="password2"
                onChange={(e) => handleChangeClearError(e, handleChange)}
                onBlur={handleBlur}
                value={values.password2}
                placeholder="Potwierdz hasło *"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.1, duration: 0.2 }}
              />
              <Button
                style={
                  isValid && values.email && values.password
                    ? {
                        color: 'white',
                        border: '1px solid #3498db',
                        backgroundColor: isSubmitting ? '#3498db' : '#181818',
                      }
                    : {}
                }
                disabled={
                  isSubmitting ||
                  !values.name ||
                  !values.email ||
                  !values.password ||
                  !values.password2
                }
                type="submit"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0, duration: 0.2 }}
              >
                Wyślij
              </Button>
            </FromStyled>
          )
        }
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
  background: #202020;
  height: 35px;
  color: #3498db;
  margin: 0 0px 15px 0px;

  border: none;
  border: 1px solid #3498db;
  padding: 2px;
  font-size: 16px;
  &:hover,
  &:focus {
    outline: none;
    border: 1px solid white;
  }
`;
const Validation = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin: 0 0 5px 0;
`;

const Button = styled(motion.button)`
  background: #202020;
  color: #6f6f6f;
  font-size: 20px;
  border: 1px solid #6f6f6f;
  height: 35px;
  width: 20%;
  align-self: flex-end;
  margin: 0 0 50px;
`;
