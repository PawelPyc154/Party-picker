import axios from 'axios';
import pl from 'date-fns/locale/pl';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { FiUpload } from 'react-icons/fi';
import { RiDeleteBin2Line } from 'react-icons/ri';
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
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [animationStop, setAnimationStop] = useState('hidden');
  const { longitude, latitude } = useSelector((state: AppState) => state.PositionAddEventReducer);
  const [startDate, setStartDate] = useState<Date | null>();
  const [serverError, setServerError] = useState('');

  const [image, setImage] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState('');

  const uploadImage = async (imageFile: File | undefined) => {
    if (!imageFile) return;
    try {
      const fileData = new FormData();
      fileData.append('file', imageFile);
      fileData.append('upload_preset', 'bthotje6');
      const res = await axios.post(`${process.env.REACT_APP_DASHBOARD_URL}`, fileData);
      // eslint-disable-next-line consistent-return
      return res.data.url;
    } catch (err) {
      throw new Error('Exception message');
    }
  };

  const container = useRef<HTMLFormElement>(null);
  useEffect(() => {
    Scroll.animateScroll.scrollTo(container.current ? container.current.offsetTop - 5 : 0);
    setAnimationStop('visible');
    return () => {
      dispatch(setCoordinates(undefined, undefined));
    };
  }, [dispatch]);

  const { isSubmitting, errors, touched, handleChange, handleBlur, values, handleSubmit, isValid } = useFormik({
    initialValues: {
      name: '',
      describe: '',
    },
    validateOnMount: true,
    validationSchema: yup.object({
      name: yup.string().required('Required').max(50, 'Too Long!'),
      describe: yup.string().max(500, 'Too Long!'),
    }),

    onSubmit: async (value) => {
      if (!startDate) return;
      try {
        const imageURL = await uploadImage(image);
        const res = await axiosWithConfig.post('/events', {
          name: value.name,
          describe: value.describe,
          coordinates: {
            longitude,
            latitude,
          },
          date: new Date(startDate).getTime(),
          image: imageURL,
        });
        await dispatch(getEvents());
        await dispatch(setCoordinates(undefined, undefined));
        history.push(`/events/${res.data.data._id}`);
        enqueueSnackbar('Wydarzenie zostało dodane', { variant: 'success' });
      } catch (err) {
        setServerError(err.response.data.error?.limiter);
        enqueueSnackbar('Nie udało się dodać wydarzenia', { variant: 'error' });
      }
    },
  });
  const uploadFile = (event: React.ChangeEvent<any>) => {
    setImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    // eslint-disable-next-line no-param-reassign
    event.target.value = null;
  };
  const cropFileName = (string: string): string => {
    if (string.length <= 9) return string;
    return `${string.slice(0, 9)}...(${string.substr(-3)})`;
  };

  const deleteImage = () => {
    setImage(undefined);
    setImagePreview('');
  };

  return (
    <AddEventContainer>
      {isSubmitting ? (
        <Loading height={80} width={80} />
      ) : (
        <FromStyled onSubmit={handleSubmit} animate={animationStop} ref={container}>
          <H2> Dodaj wydarzenie</H2>

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
              className="ellipsis"
            >
              <Ellipsis> kliknij w mapę aby pobrać współrzędne geograficzne</Ellipsis>
            </Coordinate>
          )}

          <WrapperDate
            initial="hidden"
            variants={{
              visible: { x: 0, opacity: 1, transition: { delay: 0.3, duration: 0.2 } },
              hidden: { x: 100, opacity: 0, transition: { delay: 0.3, duration: 0.2 } },
            }}
          >
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
              placeholderText="Wybierz date początku wydarzenia *"
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

          <UploadImageWraper>
            <UploadImage htmlFor="file-upload" className="custom-file-upload">
              <span>Dodaj plakat</span>
              <FiUploadIcone />
            </UploadImage>
            {image ? (
              <DeleteImage onClick={deleteImage}>
                <RiDeleteBin2LineIcone />
                {cropFileName(image?.name)}
              </DeleteImage>
            ) : null}
            <input
              id="file-upload"
              type="file"
              name="file"
              placeholder="Dodaj plakat"
              onChange={uploadFile}
              style={{ display: 'none' }}
            />
          </UploadImageWraper>
          <Button
            disabled={isSubmitting || !isValid || !longitude || !latitude || !startDate}
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

      {imagePreview ? <Image src={imagePreview} alt="" /> : null}
    </AddEventContainer>
  );
};

export default AddEvent;

const AddEventContainer = styled.main`
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  margin-top: 10px;
  border: 1px solid ${(props) => props.theme.colors.borderPrimary};
  ${media.tablet} {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.colors.scrollbarThumb};
      outline: 1px solid ${(props) => props.theme.colors.scrollbarThumb};
    }
  }
`;
const H2 = styled(motion.h2)`
  margin: 10px auto 20px;
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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0 10px;
  }
`;
const WrapperDate = styled(motion.div)`
  border: 1px solid ${(props) => props.theme.colors.layout};
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.hover};
  }
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

const Ellipsis = styled.p`
  justify-content: initial;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin: 15px 0 15px 0;
  padding: 5px;

  ${media.tablet} {
    flex-basis: 100px;
  }

  &:hover,
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.hover};
  }
`;
const DatePickerStyled = styled(DatePicker)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  height: 35px;
  color: ${(props) => props.theme.colors.textSecondary};
  /* display:flex; */
  text-align: center;
  border: none;
  border-left: none;
  padding: 2px;
  font-size: 16px;
  width: 100%;
`;

const Image = styled.img`
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  width: 100%;
  cursor: pointer;
`;
const UploadImage = styled.label`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  height: 35px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0px 15px 0px;
  border: none;
  border: 1px solid ${(props) => props.theme.colors.layout};
  padding: 2px;
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  cursor: pointer;
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.hover};
    color: ${(props) => props.theme.colors.hover};
  }
`;
const DeleteImage = styled.button`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  height: 35px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0px 15px 0px;
  border: none;
  border: 1px solid ${(props) => props.theme.colors.layout};
  padding: 2px;
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  cursor: pointer;
  ${media.tablet} {
    margin: 0 0px 15px 10px;
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.hoverDelete};
    color: ${(props) => props.theme.colors.hoverDelete};
  }
`;
const FiUploadIcone = styled(FiUpload)`
  margin: 0 0 0 5px;
  font-size: 16px;
`;
const RiDeleteBin2LineIcone = styled(RiDeleteBin2Line)`
  margin: 0 5px 0 0;
  font-size: 18px;
`;
const UploadImageWraper = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${media.tablet} {
    flex-wrap: initial;
  }
`;
