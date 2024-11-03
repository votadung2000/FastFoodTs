import { createSlice } from '@reduxjs/toolkit';

import { Notifer } from '@components';
import { formatCart } from '@utils';

import { CartData } from './cart.types';

const cartData: CartData[] = [];

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
        cartSlice.actions.handleUpdateCost;
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

    handleUpdateCost() {
      cartSlice.actions.updateTotal;
      cartSlice.actions.updateCost;
    },

    updateTotal(state) {
      try {
        const reducerReducer = (previousValue: number, currentValue: number) =>
          previousValue + currentValue;
        if (state.cart?.length > 0) {
          let totalArr = state.cart.map(
            item => item.price! * item.order_quantity!,
          );
          state.subtotal = totalArr.reduce(reducerReducer);
        } else {
          state.subtotal = 0;
        }
      } catch (error) { }
    },

    updateCost(state) {
      state.total = state.subtotal - state.discount;
    },

    plusProducts(state, action) {
      try {
        let indexPr = state.cart.findIndex(item => item?.id === action.payload?.id);
        state.cart[indexPr].order_quantity!++;
        cartSlice.actions.handleUpdateCost();
      } catch (error) { }
    },

    minusProducts(state, action) {
      try {
        let indexPr = state.cart.findIndex(item => item?.id === action.payload?.id);
        let quantity = state.cart[indexPr].order_quantity;
        if (quantity === 1) {
          cartSlice.actions.removeProducts(action.payload);
        } else {
          state.cart[indexPr].order_quantity!--;
        }
        cartSlice.actions.handleUpdateCost();
      } catch (error) { }
    },

    removeProducts(state, action) {
      try {
        state.cart = state.cart.filter(item => item?.id !== action.payload?.id);
        cartSlice.actions.handleUpdateCost();
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
  handleUpdateCost,
  updateTotal,
  updateCost,
  plusProducts,
  minusProducts,
  removeProducts,
  clearCart,
} = cartSlice.actions;
