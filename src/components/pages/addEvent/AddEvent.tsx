import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import pl from 'date-fns/locale/pl';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Scroll from 'react-scroll';
import styled from 'styled-components';
import * as yup from 'yup';
import { AppState } from '../../../state/allReducers';
import { getEvents } from '../../../state/events/action';
import { setCoordinates } from '../../../state/positionAddEvent/action';
import axiosWithConfig from '../../../utils/axiosWithConfig';
import media from '../../../utils/MediaQueries';
import Input from '../../universalComponents/Input';
import Loading from '../../universalComponents/Loading';

export interface AddEventProps {}

const AddEvent: React.FC<AddEventProps> = () => {
  const [animationStop, setAnimationStop] = useState('hidden');
  const { longitude, latitude } = useSelector((state: AppState) => state.PositionAddEventReducer);
  const [startDate, setStartDate] = useState(new Date());
  const [serverError, setServerError] = useState('');

  const history = useHistory();

  const dispatch = useDispatch();
  const container = useRef<HTMLFormElement>(null);
  useEffect(() => {
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
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: {
      name: '',
      listFb: false,
      describe: '',
    },
    validateOnMount: true,
    validationSchema: yup.object({
      name: yup.string().required('Required').max(50, 'Too Long!'),
      describe: yup.string().max(500, 'Too Long!'),
    }),
    onSubmit: async (value) => {
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
        });

        await dispatch(getEvents());
        await dispatch(setCoordinates(undefined, undefined));
        history.push('/');
      } catch (err) {
        setServerError(err.response.data.error?.limiter);
      }
    },
  });

  return (
    <AddEventContainer>
      {isSubmitting ? (
        <Loading height={80} width={80} />
      ) : (
        <FromStyled onSubmit={handleSubmit} animate={animationStop} ref={container}>
          <H2> Dodaj wydarzenie</H2>
          <br />
          {serverError ? <Validation>{serverError}</Validation> : null}
          {errors.name && touched.name && <Validation>{errors.name}</Validation>}
          <Input
            autoComplete="off"
            className={errors.name && touched.name ? 'errorInput' : ''}
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Nazwa wydarzenia *"
            initial="hidden"
            variants={{
              visible: { x: 0, opacity: 1, transition: { delay: 0.1, duration: 0.2 } },
              hidden: { x: 100, opacity: 0, transition: { delay: 0.1, duration: 0.2 } },
            }}
          />

          {longitude && latitude ? (
            <Wrapper>
              <Coordinate
                initial="hidden"
                variants={{
                  visible: { x: 0, opacity: 1, transition: { delay: 0, duration: 0.2 } },
                  hidden: { x: 100, opacity: 0, transition: { delay: 0, duration: 0.2 } },
                }}
              >
                {longitude}
              </Coordinate>
              <Coordinate
                initial="hidden"
                variants={{
                  visible: { x: 0, opacity: 1, transition: { delay: 0.1, duration: 0.2 } },
                  hidden: { x: 100, opacity: 0, transition: { delay: 0.1, duration: 0.2 } },
                }}
              >
                {longitude}
              </Coordinate>
            </Wrapper>
          ) : (
            <Coordinate
              initial="hidden"
              variants={{
                visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 0.2 } },
                hidden: { x: 100, opacity: 0, transition: { delay: 0.2, duration: 0.2 } },
              }}
            >
              kliknij w mapę aby pobrać współrzędne geograficzne
            </Coordinate>
          )}

          <WrapperDate
            initial="hidden"
            variants={{
              visible: { x: 0, opacity: 1, transition: { delay: 0.3, duration: 0.2 } },
              hidden: { x: 100, opacity: 0, transition: { delay: 0.3, duration: 0.2 } },
            }}
          >
            <LabelDate htmlFor="DatePicker">Data początku:</LabelDate>

            <DatePickerStyled
              id="DatePicker"
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
          </WrapperDate>
          {errors.describe && touched.describe && <Validation>{errors.describe}</Validation>}
          <Textarea
            className={errors.describe && touched.describe ? 'errorInput' : ''}
            name="describe"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.describe}
            placeholder="Opis wydarzenia"
            initial="hidden"
            animate={animationStop}
            variants={{
              visible: { x: 0, opacity: 1, transition: { delay: 0.5, duration: 0.2 } },
              hidden: { x: 100, opacity: 0, transition: { delay: 0.5, duration: 0.2 } },
            }}
          />

          <CheckBoxWrapper
            initial="hidden"
            variants={{
              visible: { x: 0, opacity: 1, transition: { delay: 0.6, duration: 0.2 } },
              hidden: { x: 100, opacity: 0, transition: { delay: 0.6, duration: 0.2 } },
            }}
          >
            <FormControlLabel
              control={
                <CheckboxStyled checked={values.listFb} onChange={handleChange} name="listFb" />
              }
              label="Lista FB"
              labelPlacement="start"
            />
          </CheckBoxWrapper>

          <Button
            disabled={isSubmitting || !isValid || !longitude || !latitude}
            type="submit"
            initial="hidden"
            variants={{
              visible: { x: 0, opacity: 1, transition: { delay: 0.7, duration: 0.2 } },
              hidden: { x: 100, opacity: 0, transition: { delay: 0.7, duration: 0.2 } },
            }}
          >
            Dodaj
          </Button>
        </FromStyled>
      )}
    </AddEventContainer>
  );
};

export default AddEvent;

const AddEventContainer = styled.main`
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  margin-top: 10px;
  border: 1px solid ${(props) => props.theme.colors.borderPrimary};
`;
const H2 = styled(motion.h2)`
  margin: 10px auto;
`;

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

const Validation = styled(motion.div)`
  color: ${(props) => props.theme.colors.error};
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
const WrapperDate = styled(motion.div)`
  display: grid;
  grid-template-columns: 109px 1fr;
`;
const LabelDate = styled.label`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  height: 35px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0px 0px 0px;
  border: none;
  border: 1px solid ${(props) => props.theme.colors.layout};
  border-right: none;
  padding: 2px;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  cursor: text;
`;

const Coordinate = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  height: 35px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0px 15px 0px;
  border: none;
  border: 1px solid ${(props) => props.theme.colors.borderSecondary};
  padding: 2px;
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
`;

const CheckboxStyled = styled(Checkbox)`
  && {
    color: ${(props) => props.theme.colors.layout};
  }
  &&.Mui-checked {
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;

const Button = styled(motion.button)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 20px;
  border: 1px solid ${(props) => props.theme.colors.layout};
  height: 35px;
  width: 20%;
  align-self: flex-end;
  margin-bottom: 50px;
  &:disabled {
    color: ${(props) => props.theme.colors.disable};
    border: 1px solid ${(props) => props.theme.colors.disable};
  }
`;

const Textarea = styled(motion.textarea)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 20px;
  font-family: inherit;
  font-weight: 400;
  border: 1px solid ${(props) => props.theme.colors.layout};
  flex-basis: 100px;
  resize: none;
  margin: 15px 0 0 0;
  padding: 5px;
  ${media.tablet} {
    flex-basis: 100px;
  }
`;
const DatePickerStyled = styled(DatePicker)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  height: 35px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0px 0px 0px;
  border: none;
  border: 1px solid ${(props) => props.theme.colors.layout};
  border-left: none;
  padding: 2px;
  font-size: 16px;
  width: 100%;
`;
