import { EventsActionTypes, GET_EVENTS } from './actionType';

import EventType from './EventType';

const initialState: EventType[] = [];

const EventsReducer = (state = initialState, action: EventsActionTypes): EventType[] => {
  switch (action.type) {
    case GET_EVENTS:
      return action.payload;
    default:
      return state;
  }
};


export default EventsReducer;
