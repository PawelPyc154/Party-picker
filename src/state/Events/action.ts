import {EventsActionTypes, ADD_PRODUCT_TO_BASKET} from "./actionType";
import Event from "./Event";

// eslint-disable-next-line import/prefer-default-export
export const addProductToBasket = (value: Event): EventsActionTypes => ({
  type: ADD_PRODUCT_TO_BASKET,
  payload: value,
});
