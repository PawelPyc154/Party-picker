import Event from "./Event";

export const ADD_PRODUCT_TO_BASKET = "ADD_PRODUCT_TO_BASKET";

export interface AddProductToBasket {
  type: typeof ADD_PRODUCT_TO_BASKET;
  payload: Event;
}

export type EventsActionTypes = AddProductToBasket;
