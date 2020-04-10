import {EventsActionTypes, GET_EVENTS} from "./actionType";
import axiosWithBaseURL from "../../utils/axiosWithBaseURL";
import {ThunkDispatch} from "redux-thunk";

export const getEvents = () => async (
  dispatch: ThunkDispatch<{}, {}, EventsActionTypes>
) => {
  try {
    const res = await axiosWithBaseURL.get("/api/events");
    console.log(res.data);

    dispatch({type: GET_EVENTS, payload: res.data.data});
  } catch (err) {
    console.log("bad request");
  }
};
