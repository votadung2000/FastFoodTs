import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';
import { TAB_ORDER, TabOrderProps } from '@constants';

import {
  fetchApiCreateOrder,
  fetchApiDetailOrder,
  fetchApiListOrder,
  fetchApiUpdateOrder,
} from './order.api';
import {
  OrderData,
  OrdersData,
  RelatedOrderData,
  RelatedOrdersData,
} from './order.types';

const ordersData: OrdersData = {};
const relatedOrdersData: RelatedOrdersData = {
  isLoadingOrders: false,
};

const orderData: OrderData = {};
const relatedOrderData: RelatedOrderData = {
  isLoadingOrder: false,
};

const rating: OrderData = {};

const tab: TabOrderProps = TAB_ORDER.UPCOMING;

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: ordersData,
    relatedOrders: relatedOrdersData,
    order: orderData,
    relatedOrder: relatedOrderData,
    rating,
    tab,
  },
  reducers: {
    fetchRating: (state, action) => {
      state.rating = action.payload;
    },
    handleTabSwitch: (state, action) => {
      state.tab = action.payload;
    },
    initTab: (state) => {
      state.tab = TAB_ORDER.UPCOMING;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchApiCreateOrder.rejected, (_, action) => {
        handleErrorApi(action?.error);
      })

      .addCase(fetchApiListOrder.pending, (state) => {
        state.relatedOrders.isLoadingOrders = true;
      })
      .addCase(fetchApiListOrder.fulfilled, (state, action) => {
        state.relatedOrders.isLoadingOrders = false;
        state.orders = action.payload?.data;
      })
      .addCase(fetchApiListOrder.rejected, (state, action) => {
        state.relatedOrders.isLoadingOrders = false;
        handleErrorApi(action?.error);
      })

      .addCase(fetchApiDetailOrder.pending, (state) => {
        state.relatedOrder.isLoadingOrder = true;
      })
      .addCase(fetchApiDetailOrder.fulfilled, (state, action) => {
        state.relatedOrder.isLoadingOrder = false;
        state.order = action.payload?.data;
      })
      .addCase(fetchApiDetailOrder.rejected, (state, action) => {
        state.relatedOrder.isLoadingOrder = false;
        handleErrorApi(action?.error);
      })

      .addCase(fetchApiUpdateOrder.rejected, (_, action) => {
        handleErrorApi(action?.error);
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const {
  fetchRating,
  handleTabSwitch,
  initTab,
} = orderSlice.actions;
