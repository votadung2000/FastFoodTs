import {
  cartReducer,
  addToCart,
  plusProducts,
  minusProducts,
  removeProducts,
  clearCart,
} from './cart.reducer';
import { cartSelector } from './cart.selector';
import { CartData } from './cart.types';

export {
  cartReducer,

  addToCart,
  plusProducts,
  minusProducts,
  removeProducts,
  clearCart,

  cartSelector,
};

export type {
  CartData,
};
