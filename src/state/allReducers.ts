import { combineReducers } from 'redux';
import EventsReducer from './events/reducer';
import AuthReducer from './auth/reducer';

const allReducers = combineReducers({
  EventsReducer,
  AuthReducer,
});

export type AppState = ReturnType<typeof allReducers>;
export default allReducers;
