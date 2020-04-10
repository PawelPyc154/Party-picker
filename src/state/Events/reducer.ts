import {EventsActionTypes, GET_EVENTS} from "./actionType";

import Event from "./Event";

const initialState: Event[] = [];

const EventsReducer = (
  state = initialState,
  action: EventsActionTypes
): Event[] => {
  switch (action.type) {
    case GET_EVENTS:
      return action.payload;
    default:
      return state;
  }
};
export default EventsReducer;
