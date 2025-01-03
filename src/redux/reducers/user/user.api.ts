import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    ApiUserProfile,
    ApiUpdateProfile,
    ApiUpdatePassword,
} from '@api';
import { handleApiCall } from '@common';
import { getToken } from '@storage';

export const fetchApiUserProfile = createAsyncThunk(
    'user/fetchApiUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiUserProfile());
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const refetchApiUserProfile = createAsyncThunk(
    'user/refetchApiUserProfile',
    async (_, { dispatch }) => {
        const token = await getToken();
        if (token) {
            dispatch(fetchApiUserProfile());
        }
    }
);

export const fetchApiUpdateProfile = createAsyncThunk(
    'user/fetchApiUpdateProfile',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiUpdateProfile(data));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiUpdatePassword = createAsyncThunk(
    'user/fetchApiUpdatePassword',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiUpdatePassword(data));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
