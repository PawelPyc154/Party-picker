import PositionAddEvent from './PositionAddEvent';
import { PositionAddEventTypes, SET_COORDINATES } from './actionType';

const initialState: PositionAddEvent = {
  longitude: undefined,
  latitude: undefined,
};

const PositionAddEventReducer = (
  state = initialState,
  action: PositionAddEventTypes,
): PositionAddEvent => {
  switch (action.type) {
    case SET_COORDINATES:
      return action.payload;
    default:
      return state;
  }
};

export default PositionAddEventReducer;
