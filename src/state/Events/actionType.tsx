import Event from './Event';

export const GET_EVENTS = 'GET_EVENTS';

export interface GetEvents {
  type: typeof GET_EVENTS;
  payload: Event[];
}

export type EventsActionTypes = GetEvents;
