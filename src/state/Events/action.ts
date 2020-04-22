import { ThunkDispatch } from 'redux-thunk';
import { EventsActionTypes, GET_EVENTS } from './actionType';
import axiosWithConfig from '../../utils/axiosWithConfig';

export const getEvents = () => async (dispatch: ThunkDispatch<{}, {}, EventsActionTypes>) => {
  try {
    const res = await axiosWithConfig.get('/events');
    dispatch({ type: GET_EVENTS, payload: res.data.data });
  } catch (err) {
    console.log('bad request');
  }
};
