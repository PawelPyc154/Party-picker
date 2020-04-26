import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Scroll from 'react-scroll';
import styled from 'styled-components';
import * as yup from 'yup';
import axiosWithConfig from '../../../utils/axiosWithConfig';
import media from '../../../utils/MediaQueries';

export interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const [animateVariant, setAnimateVariant] = useState('hidden');
  useEffect(() => {
    setAnimateVariant('visible');
  }, []);

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Required'),
    subject: yup.string().required('Required').min(6, 'Too Short!').max(50, 'Too Long!'),
    message: yup.string().required('Required').min(6, 'Too Short!').max(500, 'Too Long!'),
  });

  const handleSubmit = async (
    email: string,
    subject: string,
    message: string,
    resetForm: () => void,
  ) => {
    try {
      await axiosWithConfig.post('https://portfolio321123.herokuapp.com/email', {
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
              autoComplete="nope"
              style={errors.email && touched.email ? { border: '1px solid #e74c3c' } : {}}
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
              style={errors.subject && touched.subject ? { border: '1px solid #e74c3c' } : {}}
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
              style={errors.message && touched.message ? { border: '1px solid #e74c3c' } : {}}
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
              style={
                isValid && values.email && values.subject && values.message
                  ? {
                      color: 'white',
                      border: '1px solid #3498db',
                      backgroundColor: isSubmitting ? '#3498db' : 'transparent',
                    }
                  : {}
              }
              disabled={isValid && isSubmitting}
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
  background-color: #202020;
  margin-top: 10px;
  border: 1px solid #313131;
`;
const FromStyled = styled(Form)`
  width: auto;
  margin: 10px 0 5px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  ${media.tablet} {
    margin: 10vh auto 5px;
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
const Textarea = styled(motion.textarea)`
  background: #202020;
  color: #3498db;
  font-size: 20px;
  font-family: inherit;
  font-weight: 400;
  border: 1px solid #3498db;
  flex-basis: 200px;
  resize: none;
  margin: 0 0px 15px 0px;
  ${media.tablet} {
    flex-basis: 300px;
  }
  &:hover,
  &:focus {
    outline: none;
    border: 1px solid white;
  }
`;
