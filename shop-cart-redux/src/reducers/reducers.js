import { PURCHASE, CLEARCART } from '../actions/action';

export const intialState = {  cart: [],  counter: Array(5).fill(null), };

export const reducer = (state = intialState, action) => {

  switch (action.type) {

    case PURCHASE:
      return {
        ...state,
        cart: [...state.cart, action.value],
        counter:[...state.counter],
      };

      case CLEARCART:
      return {
        cart: [],
        counter: Array(5).fill(null),
      };

    default:
      return state;
  }
  
};