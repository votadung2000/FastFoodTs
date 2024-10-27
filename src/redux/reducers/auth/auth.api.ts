import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiLogin, ApiRegister } from '@api';
import { handleApiCall } from '@common';

export const fetchApiLogin = createAsyncThunk(
    'user/fetchApiLogin',
    async (data: any = {}, { rejectWithValue }) => {
        try {
            return handleApiCall(() => ApiLogin(data));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiRegister = createAsyncThunk(
    'user/fetchApiRegister',
    async (data: any = {}, { rejectWithValue }) => {
        try {
            return handleApiCall(() => ApiRegister(data));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
