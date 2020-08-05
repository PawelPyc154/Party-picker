import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import * as yup from 'yup';
import { AppState } from '../../../../state/allReducers';
import { clearError, setRegister } from '../../../../state/auth/action';
import media from '../../../../utils/MediaQueries';
import Input from '../../../universal/Input';
import Loading from '../../../universal/Loading';

export interface SignupProps {
  errorServerVisibleOn: string;
  setErrorServerVisibleOn: Dispatch<SetStateAction<string>>;
}

const Signup: React.FC<SignupProps> = ({ errorServerVisibleOn, setErrorServerVisibleOn }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: AppState) => state.AuthReducer);

  const [animationStop, setAnimationStop] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().required('Nazwa użytkownika jest wymagana.'),
    email: yup.string().email('Wpisz email.').required('Email jest wymagany.'),
    password: yup.string().required('Hasło jest wymagane.').min(6, 'Hasło powinno mieć przynajmneij 6 znaków.'),
    password2: yup
      .string()
      .required('Potwierdzenie hasła jest wymagane.')
      .oneOf([yup.ref('password'), null], 'Hasło nie zostało dopasowane.'),
  });

  const handleChangeClearError = (e: React.ChangeEvent<any>, handleChange: (e: React.ChangeEvent<any>) => void) => {
    dispatch(clearError());
    handleChange(e);
  };

  return (
    <SignupContainer>
      <Formik
        validateOnMount
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
                className={errors.name && touched.name ? 'errorInput' : ''}
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
                className={errors.email && touched.email ? 'errorInput' : ''}
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
                className={errors.password && touched.password ? 'errorInput' : ''}
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
                className={errors.password2 && touched.password2 ? 'errorInput' : ''}
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
                disabled={isSubmitting || !isValid}
                type="submit"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0, duration: 0.2 }}
              >
                Utwórz konto
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

const Validation = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 12px;
  margin: 0 0 5px 0;
`;

const Button = styled(motion.button)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 20px;
  border: 1px solid ${(props) => props.theme.colors.layout};
  height: 35px;
  padding: 0 10px;
  align-self: flex-end;
  &:disabled {
    color: ${(props) => props.theme.colors.disable};
    border: 1px solid ${(props) => props.theme.colors.disable};
  }
`;
