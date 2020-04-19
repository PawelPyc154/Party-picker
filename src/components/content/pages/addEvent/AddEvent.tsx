import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import Scroll from 'react-scroll';
import styled from 'styled-components';

import Loading from '../../../universalComponents/Loading';
import media from '../../../../utils/MediaQueries';
import Provinces from './provinces/Provinces';

export interface AddEventProps {}

const AddEvent: React.SFC<AddEventProps> = () => {
  //   const dispatch = useDispatch();

  const [animationStop, setAnimationStop] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required').min(6, 'Too Short!'),
  });

  // Scroll animation
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Scroll.animateScroll.scrollTo(container.current ? container.current.offsetTop - 5 : 0);
  }, []);

  return (
    <AddEventContainer>
      <Formik
        validateOnChange
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          place: '',
          province: '',
        }}
        onSubmit={async ({ name, place }, { setSubmitting }) => {
          setSubmitting(true);
          setAnimationStop(true);
          try {
            // await dispatch(setLogin(email, password));
          } catch {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          isValid,
          setFieldValue,
        }) =>
          isSubmitting ? (
            <Loading height={188} width={80} />
          ) : (
            <FromStyled>
              {/* <Header
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.9, duration: 0.2 }}
              >
                Dodaj wydarzenie
              </Header> */}

              {errors.name && touched.name && <Validation>{errors.name}</Validation>}
              <Input
                autoComplete="off"
                style={errors.name && touched.name ? { border: '1px solid #e74c3c' } : {}}
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Nazwa *"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.8, duration: 0.2 }}
              />

              {errors.place && touched.place && <Validation>{errors.place}</Validation>}
              <Input
                autoComplete="off"
                style={errors.place && touched.place ? { border: '1px solid #e74c3c' } : {}}
                type=""
                name="place"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.place}
                placeholder="Miejscowość *"
                initial={animationStop ? {} : { x: 100, opacity: 0 }}
                animate={animationStop ? {} : { x: [100, 0], opacity: [0, 1] }}
                transition={{ delay: 0.7, duration: 0.2 }}
              />

              <Provinces
                setFieldValue={setFieldValue}
                provinceChosen={values.province}
                setAnimationStop={setAnimationStop}
              />

              <Button
                style={
                  isValid && values.name && values.place
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
              <pre style={{ color: 'white' }}>{JSON.stringify(values, null, 2)}</pre>
            </FromStyled>
          )
        }
      </Formik>
    </AddEventContainer>
  );
};

export default AddEvent;

const AddEventContainer = styled.main`
  overflow: hidden;
  padding: 5px;
`;
// const Header = styled(motion.h2)`
//   margin-bottom: 10px;
// `;
const FromStyled = styled(Form)`
  width: auto;
  margin: 10px 5px 5px;
  display: flex;
  flex-direction: column;

  ${media.tablet} {
    margin: 10px auto 5px;
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

// name: {
//   type: String,
//   trim: true,
//   required: [true, 'Please add a name'],
// },
// slug: String,
// coordinates: {
//   longitude: {
//     type: Number,
//     required: [true, 'Please add a longitude'],
//   },
//   latitude: {
//     type: Number,
//     required: [true, 'Please add a longitude'],
//   },
// },
// place: {
//   trim: true,
//   type: String,
//   required: [true, 'Please add place'],
// },
// province: {
//   trim: true,
//   type: String,
//   enum: [
//     'dolnośląskie',
//     'kujawsko-pomorskie',
//     'lubuskie',
//     'łódzkie',
//     'małopolskie',
//     'mazowieckie',
//     'opolskie',
//     'podkarpackie',
//     'podlaskie',
//     'pomorskie',
//     'śląskie',
//     'świętokrzyskie',
//     'warmińsko-mazurskie',
//     'wielkopolskie',
//     'zachodniopomorskie',
//   ],
//   required: [true, 'Please add province'],
// },
// time: {
//   start: {
//     type: Number,
//     required: [true, 'Please add event time start'],
//   },
//   end: {
//     type: Number,
//   },
// },
// type: {
//   type: String,
//   enum: ['dance', 'picnic'],
//   default: 'dance',
// },
// attractions: {
//   type: [String],
//   enum: ['dance', 'picnic'],
// },
// fbList: {
//   type: Boolean,
//   default: false,
// },
