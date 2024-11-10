import { createSlice } from '@reduxjs/toolkit';

import { Notifer } from '@components';
import { formatCart } from '@utils';

import { CartData } from './cart.types';

const cartData: CartData[] = [];

const calculateCosts = (state: any) => {
  state.subtotal = state.cart.reduce((acc: number, current: CartData) => acc + current.price! * current.order_quantity!, 0);
  state.total = state.subtotal - state.discount;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: cartData,
    subtotal: 0,
    discount: 0,
    total: 0,
  },
  reducers: {
    addToCart(state, action) {
      try {
        if (state.cart?.length > 0) {
          let indexPr = state.cart?.findIndex(pr => pr?.id === action?.payload?.id);
          if (indexPr === -1) {
            state.cart?.push(formatCart(action.payload));
          } else {
            state.cart[indexPr].order_quantity!++;
          }
        } else {
          state.cart.push(formatCart(action.payload));
        }

        calculateCosts(state);

        Notifer({
          title: 'Added To Cart Successfully',
          alertType: 'success',
        });
      } catch (error) {
        Notifer({
          title: 'Error Operation',
          alertType: 'info',
        });
      }
    },

    plusProducts(state, action) {
      try {
        let indexPr = state.cart.findIndex(item => item?.id === action.payload?.id);
        state.cart[indexPr].order_quantity!++;
        calculateCosts(state);
      } catch (error) { }
    },

    minusProducts(state, action) {
      try {
        let indexPr = state.cart.findIndex(item => item?.id === action.payload?.id);
        if (indexPr !== -1) {
          let orderQuantity = state.cart[indexPr].order_quantity;
          if (orderQuantity === 1) {
            state.cart.splice(indexPr, 1);
            Notifer({
              title: 'Product Deleted Successfully',
              alertType: 'success',
            });
          } else {
            state.cart[indexPr].order_quantity!--;
          }

          calculateCosts(state);
        }
      } catch (error) { }
    },

    removeProducts(state, action) {
      try {
        state.cart = state.cart.filter(item => item?.id !== action.payload?.id);

        calculateCosts(state);

        Notifer({
          title: 'Product Deleted Successfully',
          alertType: 'success',
        });
      } catch (error) {
        Notifer({
          title: 'Error Operation',
          alertType: 'info',
        });
      }
    },

    clearCart(state) {
      state.cart = [];
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  plusProducts,
  minusProducts,
  removeProducts,
  clearCart,
} = cartSlice.actions;
