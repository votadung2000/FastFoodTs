import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  ApiCreateOrder,
  ApiDetailOrder,
  ApiListOrder,
  ApiUpdateOrder,
} from '@api';
import { handleApiCall, Params } from '@common';

export const fetchApiCreateOrder = createAsyncThunk(
  'order/fetchApiCreateOrder',
  async (params: Params = {}, { rejectWithValue }) => {
    try {
      const response = await handleApiCall(() => ApiCreateOrder(params));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchApiListOrder = createAsyncThunk(
  'order/fetchApiListOrder',
  async (params: Params = {}, { rejectWithValue }) => {
    try {
      const response = await handleApiCall(() => ApiListOrder(params));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchApiDetailOrder = createAsyncThunk(
  'order/fetchApiDetailOrder',
  async (params: Params = {}, { rejectWithValue }) => {
    try {
      const response = await handleApiCall(() => ApiDetailOrder(params?.id));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchApiUpdateOrder = createAsyncThunk(
  'order/fetchApiUpdateOrder',
  async (params: Params = {}, { rejectWithValue }) => {
    const { id, ...restParams } = params;
    try {
      const response = await handleApiCall(() => ApiUpdateOrder({
        id: id,
        data: restParams,
      }));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
