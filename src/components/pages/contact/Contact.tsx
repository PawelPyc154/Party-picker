import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Scroll from 'react-scroll';
import styled from 'styled-components';
import * as yup from 'yup';
import axiosWithConfig from '../../../utils/axiosWithConfig';
import Input from '../../shared/Input';

export interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const [animateVariant, setAnimateVariant] = useState('hidden');
  useEffect(() => {
    setAnimateVariant('visible');
  }, []);

  const validationSchema = yup.object({
    email: yup.string().email('Wpisz email.').required('Email jest wymagany.'),
    subject: yup
      .string()
      .required('Temat jest wymagany.')
      .min(6, 'Zbyt krótki temat.')
      .max(50, 'Temat nie powinien być dłuższy niź 50 znaków.'),
    message: yup
      .string()
      .required('Wiadomość jest wymagana.')
      .min(6, 'Zbyt krótka wiadomość.')
      .max(500, 'Wiadomość nie powinna mieć więcej jak 500 znaków.'),
  });

  const handleSubmit = async (email: string, subject: string, message: string, resetForm: () => void) => {
    try {
      await axiosWithConfig.post('/api/contact', {
        email,
        subject,
        message,
      });

      await setAnimateVariant('hidden');
      await resetForm();
      await setTimeout(() => {
        setAnimateVariant('visible');
      }, 1400);
    } catch (err) {
      Error(err);
    }
  };

  // Scroll animation
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Scroll.animateScroll.scrollTo(container.current ? container.current.offsetTop - 5 : 0);
  }, []);

  return (
    <ContactContainer ref={container}>
      <Formik
        validateOnMount
        validateOnChange
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          subject: '',
          message: '',
        }}
        onSubmit={async ({ email, subject, message }, { setSubmitting, resetForm }) => {
          await setSubmitting(true);
          await handleSubmit(email, subject, message, resetForm);
          await setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, isValid }) => (
          <FromStyled>
            {errors.email && touched.email && <Validation>{errors.email}</Validation>}
            <Input
              autoComplete="off"
              className={errors.email && touched.email ? 'errorInput' : ''}
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Email"
              initial="hidden"
              animate={animateVariant}
              variants={{
                visible: { x: 0, opacity: 1, transition: { delay: 0.3, duration: 0.2 } },
                hidden: { x: 100, opacity: 0, transition: { delay: 0.3, duration: 0.2 } },
              }}
            />

            {errors.subject && touched.subject && <Validation>{errors.subject}</Validation>}
            <Input
              autoComplete="off"
              className={errors.subject && touched.subject ? 'errorInput' : ''}
              type="subject"
              name="subject"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.subject}
              placeholder="Temat"
              initial="hidden"
              animate={animateVariant}
              variants={{
                visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 0.2 } },
                hidden: { x: 100, opacity: 0, transition: { delay: 0.2, duration: 0.2 } },
              }}
            />
            {errors.message && touched.message && <Validation>{errors.message}</Validation>}
            <Textarea
              className={errors.message && touched.message ? 'errorInput' : ''}
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
              placeholder="Wiadomość"
              initial="hidden"
              animate={animateVariant}
              variants={{
                visible: { x: 0, opacity: 1, transition: { delay: 0.1, duration: 0.2 } },
                hidden: { x: 100, opacity: 0, transition: { delay: 0.1, duration: 0.2 } },
              }}
            />
            <Button
              disabled={isSubmitting || !isValid}
              type="submit"
              initial="hidden"
              animate={animateVariant}
              variants={{
                visible: { x: 0, opacity: 1, transition: { delay: 0, duration: 0.2 } },
                hidden: { x: 100, opacity: 0, transition: { delay: 0, duration: 0.2 } },
              }}
            >
              Wyślij
            </Button>
          </FromStyled>
        )}
      </Formik>
    </ContactContainer>
  );
};

export default Contact;

const ContactContainer = styled.main`
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
`;
const FromStyled = styled(Form)`
  width: auto;
  margin: 10px 0 5px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  ${({ theme }) => theme.mq.md} {
    margin: 10vh auto 5px;
    max-width: 500px;
  }
`;
const Validation = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
  margin: 0 0 5px 0;
`;
const Button = styled(motion.button)`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 20px;
  border: 1px solid ${({ theme }) => theme.colors.layout};
  height: 35px;
  width: 20%;
  align-self: flex-end;
  margin: 0 0 50px;
  &:disabled {
    color: ${(props) => props.theme.colors.disable};
    border: 1px solid ${({ theme }) => theme.colors.disable};
  }
`;
const Textarea = styled(motion.textarea)`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.layout};
  font-size: 20px;
  font-family: inherit;
  font-weight: 400;
  border: 1px solid ${({ theme }) => theme.colors.layout};
  flex-basis: 200px;
  resize: none;
  margin: 0 0px 15px 0px;
  padding: 5px;
  ${({ theme }) => theme.mq.md} {
    flex-basis: 200px;
  }
  &:hover,
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.hover};
  }
`;
