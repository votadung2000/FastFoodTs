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
        return handleApiCall(() => ApiUserProfile()).catch(rejectWithValue);
    }
);

export const refetchApiUserProfile = createAsyncThunk(
    'user/refetchApiUserProfile',
    async () => {
        let token = await getToken();
        if (token) {
            fetchApiUserProfile();
        }
    }
);

export const fetchApiUpdateProfile = createAsyncThunk(
    'user/fetchApiUpdateProfile',
    async (data:any, { rejectWithValue }) => {
        return handleApiCall(() => ApiUpdateProfile(data)).catch(rejectWithValue);
    }
);

export const fetchApiUpdatePassword = createAsyncThunk(
    'user/fetchApiUpdatePassword',
    async (data:any, { rejectWithValue }) => {
        return handleApiCall(() => ApiUpdatePassword(data)).catch(rejectWithValue);
    }
);
