import { SET_COORDINATES } from './actionType';

export const setCoordinates = (longitude: undefined | number, latitude: undefined | number) => ({
  type: SET_COORDINATES,
  payload: {
    longitude,
    latitude,
  },
});
