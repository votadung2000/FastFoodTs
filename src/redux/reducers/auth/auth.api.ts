import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiLogin, ApiRegister } from '@api';
import { handleApiCall } from '@common';

export const fetchApiLogin = createAsyncThunk(
    'user/fetchApiLogin',
    async (data: any = {}, { rejectWithValue }) => {
        return handleApiCall(() => ApiLogin(data)).catch(rejectWithValue);
    }
);

export const fetchApiRegister = createAsyncThunk(
    'user/fetchApiRegister',
    async (data: any = {}, { rejectWithValue }) => {
        return handleApiCall(() => ApiRegister(data)).catch(rejectWithValue);
    }
);
