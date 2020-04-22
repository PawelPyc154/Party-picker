import { combineReducers } from 'redux';
import EventsReducer from './events/reducer';
import AuthReducer from './auth/reducer';
import PositionAddEventReducer from './positionAddEvent/reducer';

const allReducers = combineReducers({
  EventsReducer,
  AuthReducer,
  PositionAddEventReducer,
});

export type AppState = ReturnType<typeof allReducers>;
export default allReducers;
