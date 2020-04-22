export const SET_COORDINATES = 'SET_COORDINATES';

export interface SetCoordinates {
  type: typeof SET_COORDINATES;
  payload: {
    longitude: undefined | number;
    latitude: undefined | number;
  };
}

export type PositionAddEventTypes = SetCoordinates;
