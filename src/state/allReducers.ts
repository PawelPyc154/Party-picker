import {combineReducers} from "redux";
import EventsReducer from "./events/reducer";

const allReducers = combineReducers({
  EventsReducer,
});

export type AppState = ReturnType<typeof allReducers>;
export default allReducers;
