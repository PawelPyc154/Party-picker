import EventType from './EventType';

export const GET_EVENTS = 'GET_EVENTS';

export interface GetEvents {
  type: typeof GET_EVENTS;
  payload: EventType[];
}

export type EventsActionTypes = GetEvents;
