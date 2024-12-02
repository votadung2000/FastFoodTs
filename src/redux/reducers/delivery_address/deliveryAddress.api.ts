import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleApiCall, Params } from '@common';
import {
    ApiCreateAddress,
    ApiCurrentAddress,
    ApiDeleteAddress,
    ApiDeliveryAddress,
    ApiDetailDeliveryAddress,
    ApiUpdateAddress,
} from '@api';

export const fetchApiCurrentAddress = createAsyncThunk(
    'deliveryAddress/fetchApiCurrentAddress',
    async (_, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiCurrentAddress());
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiListAddress = createAsyncThunk(
    'deliveryAddress/fetchApiListAddress',
    async (params: Params = {}, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiDeliveryAddress(params));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiDeleteAddress = createAsyncThunk(
    'deliveryAddress/fetchApiDeleteAddress',
    async (params: Params = {}, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiDeleteAddress(params?.id));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiDetailAddress = createAsyncThunk(
    'deliveryAddress/fetchApiDetailAddress',
    async (params: Params = {}, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiDetailDeliveryAddress(params?.id));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiCreateAddress = createAsyncThunk(
    'deliveryAddress/fetchApiCreateAddress',
    async (params: Params = {}, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiCreateAddress(params));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiUpdateAddress = createAsyncThunk(
    'deliveryAddress/fetchApiUpdateAddress',
    async (params: Params = {}, { rejectWithValue }) => {
        const { id, ...restParams } = params;

        try {
            const response = await handleApiCall(() => ApiUpdateAddress({
                id,
                data: restParams,
            }));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
