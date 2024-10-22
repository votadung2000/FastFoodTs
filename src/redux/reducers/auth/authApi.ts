import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiLogin } from '@api';
import { handleApiCall } from '@common';

export const fetchApiLogin = createAsyncThunk(
    'user/fetchApiLogin',
    async (data: any, { rejectWithValue }) => {
        return handleApiCall(() => ApiLogin(data)).catch(rejectWithValue);
    }
);
