import { ThunkDispatch } from 'redux-thunk';
import { EventsActionTypes, GET_EVENTS } from './actionType';
import axiosWithBaseURL from '../../utils/axiosWithBaseURL';

export const getEvents = () => async (dispatch: ThunkDispatch<{}, {}, EventsActionTypes>) => {
  try {
    const res = await axiosWithBaseURL.get('/api/events');

    dispatch({ type: GET_EVENTS, payload: res.data.data });
  } catch (err) {
    console.log('bad request');
  }
};
