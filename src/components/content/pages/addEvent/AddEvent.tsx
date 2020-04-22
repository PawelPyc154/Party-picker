import React, { useState, useRef, useEffect } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import Scroll from 'react-scroll';
import styled from 'styled-components';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import pl from 'date-fns/locale/pl'; // the locale you want

import { withStyles } from '@material-ui/core';

import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';

import media from '../../../../utils/MediaQueries';
import Loading from '../../../universalComponents/Loading';
import TypeOfEvent from './typeOfEvent/TypeOfEvent';
import { AppState } from '../../../../state/allReducers';
import { setCoordinates } from '../../../../state/positionAddEvent/action';
import axiosWithConfig from '../../../../utils/axiosWithConfig';
import { getEvents } from '../../../../state/events/action';

export interface AddEventProps {}

const AddEvent: React.SFC<AddEventProps> = () => {
  const [animationStop, setAnimationStop] = useState('hidden');
  const { longitude, latitude } = useSelector((state: AppState) => state.PositionAddEventReducer);
  const [startDate, setStartDate] = useState(new Date());

  const [serverError, setServerError] = useState('');

  const dispatch = useDispatch();
  const container = useRef<HTMLFormElement>(null);
  useEffect(() => {
    // Animation init
    Scroll.animateScroll.scrollTo(container.current ? container.current.offsetTop - 5 : 0);
    setAnimationStop('visible');
    return () => {
      dispatch(setCoordinates(undefined, undefined));
    };
  }, [dispatch]);

  const {
    isSubmitting,
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      listFb: false,
      typeOfEvent: 'dance',
      describe: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Required').max(50, 'Too Long!'),
      describe: yup.string().max(500, 'Too Long!'),
      typeOfEvent: yup.string().required('Required'),
    }),
    onSubmit: async (value, { resetForm }) => {
      try {
        await axiosWithConfig.post('/events', {
          name: value.name,
          describe: value.describe,
          coordinates: {
            longitude,
            latitude,
          },
          date: Date.parse(startDate.toString()),

          fbList: value.listFb,
          type: value.typeOfEvent,
        });

        await dispatch(getEvents());
        await dispatch(setCoordinates(undefined, undefined));
        resetForm();
      } catch (err) {
        console.log(err.response.data.error?.limiter);

        setServerError(err.response.data.error?.limiter);
      }
    },
  });

  return isSubmitting ? (
    <Loading height={188} width={80} />
  ) : (
    <FromStyled onSubmit={handleSubmit} animate={animationStop} ref={container}>
      {serverError ? <Validation>{serverError}</Validation> : null}
      <motion.h3
        initial="hidden"
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 0, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 0, duration: 0.2 } },
        }}
      >
        Nazwa wydarzenia *
      </motion.h3>
      {errors.name && touched.name && <Validation>{errors.name}</Validation>}
      <Input
        autoComplete="off"
        style={errors.name && touched.name ? { border: '1px solid #e74c3c' } : {}}
        type="text"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        initial="hidden"
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 0.1, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 0.1, duration: 0.2 } },
        }}
      />
      <motion.h3
        initial="hidden"
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 0.2, duration: 0.2 } },
        }}
      >
        Współrzędne geograficzne *
      </motion.h3>
      <Wrapper>
        <Coordinate
          initial="hidden"
          variants={{
            visible: { x: 0, opacity: 1, transition: { delay: 0.3, duration: 0.2 } },
            hidden: { x: 100, opacity: 0, transition: { delay: 0.3, duration: 0.2 } },
          }}
        >
          {longitude || 'kliknij w mapę'}
        </Coordinate>
        <Coordinate
          initial="hidden"
          variants={{
            visible: { x: 0, opacity: 1, transition: { delay: 0.4, duration: 0.2 } },
            hidden: { x: 100, opacity: 0, transition: { delay: 0.4, duration: 0.2 } },
          }}
        >
          {latitude || 'kliknij w mapę'}
        </Coordinate>
      </Wrapper>

      <motion.h3
        initial="hidden"
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 0.5, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 0.5, duration: 0.2 } },
        }}
      >
        Data początku *
      </motion.h3>
      <motion.div
        initial="hidden"
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 0.6, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 0.6, duration: 0.2 } },
        }}
      >
        <DatePickerStyled
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          showTimeSelect
          timeFormat="p"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="p MMMM d, yyyy"
          locale={pl}
          withPortal
          minDate={new Date()}
        />
      </motion.div>

      <motion.h3
        initial="hidden"
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 0.9, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 0.9, duration: 0.2 } },
        }}
      >
        Typ wydarzenia *
      </motion.h3>
      {errors.typeOfEvent && touched.typeOfEvent && <Validation>{errors.typeOfEvent}</Validation>}
      <TypeOfEvent setFieldValue={setFieldValue} typeOfEventChosen={values.typeOfEvent} />

      <motion.h3
        initial="hidden"
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 1.1, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 1.1, duration: 0.2 } },
        }}
      >
        Opis wydarzenia
      </motion.h3>
      {errors.describe && touched.describe && <Validation>{errors.describe}</Validation>}
      <Textarea
        style={errors.describe && touched.describe ? { border: '1px solid #e74c3c' } : {}}
        name="describe"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.describe}
        initial="hidden"
        animate={animationStop}
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 1.2, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 1.2, duration: 0.2 } },
        }}
      />

      <CheckBoxWrapper
        initial="hidden"
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 1.3, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 1.3, duration: 0.2 } },
        }}
      >
        <FormControlLabel
          control={<CheckboxStyled checked={values.listFb} onChange={handleChange} name="listFb" />}
          label="Lista FB"
          labelPlacement="start"
        />
      </CheckBoxWrapper>

      <Button
        style={
          values.name && longitude && latitude && values.typeOfEvent
            ? {
                color: 'white',
                border: '1px solid #3498db',
                backgroundColor: isSubmitting ? '#3498db' : 'transparent',
              }
            : {}
        }
        disabled={isSubmitting || !values.name || !longitude || !latitude || !values.typeOfEvent}
        type="submit"
        initial="hidden"
        variants={{
          visible: { x: 0, opacity: 1, transition: { delay: 1.4, duration: 0.2 } },
          hidden: { x: 100, opacity: 0, transition: { delay: 1.4, duration: 0.2 } },
        }}
      >
        Wyślij
      </Button>
      {/* <pre style={{ color: 'white' }}>{JSON.stringify(values, null, 2)}</pre>
      <pre style={{ color: 'white' }}>{JSON.stringify(errors, null, 2)}</pre> */}
    </FromStyled>
  );
};

export default AddEvent;

const FromStyled = styled(motion.form)`
  width: 100%;
  margin: 10px 0 5px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  ${media.tablet} {
    margin: 40px auto 5px;
    max-width: 600px;
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
  width: 100%;

  &:disabled {
    border: 1px solid #667575;
  }
  &:focus {
    outline: none;
  }
`;
const Validation = styled(motion.div)`
  color: #e74c3c;
  font-size: 12px;
  margin: 0 0 5px 0;
`;
const CheckBoxWrapper = styled(motion.div)`
  align-self: flex-end;
  margin: 10px 0;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0 10px;
  }
`;

const Coordinate = styled(motion.div)`
  background: #181818;
  height: 40px;
  color: #3498db;
  margin: 0 0px 15px 0px;
  border: none;
  border: 1px solid #667575;
  padding: 2px;
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 5px;
`;

const CheckboxStyled = withStyles({
  root: {
    color: '#3498db',
    '&$checked': {
      color: 'white',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const Button = styled(motion.button)`
  background: #181818;
  color: #6f6f6f;
  font-size: 20px;
  border: 1px solid #6f6f6f;
  height: 35px;
  width: 20%;
  align-self: flex-end;
  margin-bottom: 50px;
`;

const Textarea = styled(motion.textarea)`
  background: #181818;
  color: #3498db;
  font-size: 20px;
  font-family: inherit;
  font-weight: 400;
  border: 1px solid #3498db;
  flex-basis: 100px;
  resize: none;
  margin: 0 0px 15px 0px;
  ${media.tablet} {
    flex-basis: 100px;
  }
`;
const DatePickerStyled = styled(DatePicker)`
  background: #181818;
  height: 40px;
  color: #3498db;
  margin: 0 0px 15px 0px;
  border: none;
  border: 1px solid #3498db;
  padding: 2px;
  font-size: 16px;
  width: 100%;
`;
