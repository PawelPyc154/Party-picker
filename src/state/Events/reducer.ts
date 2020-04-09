import {EventsActionTypes} from "./actionType";

import Event from "./Event";

const initialState: Event[] = [];

const EventsReducer = (
  state = initialState,
  action: EventsActionTypes
): Event[] => {
  switch (action.type) {
    default:
      return state;
  }
};
export default EventsReducer;
