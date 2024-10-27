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
            return handleApiCall(() => ApiUserProfile());

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const refetchApiUserProfile = createAsyncThunk(
    'user/refetchApiUserProfile',
    async (_, { dispatch }) => {
        let token = await getToken();
        if (token) {
            dispatch(fetchApiUserProfile());
        }
    }
);

export const fetchApiUpdateProfile = createAsyncThunk(
    'user/fetchApiUpdateProfile',
    async (data: any, { rejectWithValue }) => {
        try {
            return handleApiCall(() => ApiUpdateProfile(data));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiUpdatePassword = createAsyncThunk(
    'user/fetchApiUpdatePassword',
    async (data: any, { rejectWithValue }) => {
        try {
            return handleApiCall(() => ApiUpdatePassword(data));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
