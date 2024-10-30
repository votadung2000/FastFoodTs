import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleApiCall } from '@common';
import { ApiCurrentAddress } from '@api';

export const fetchApiCurrentAddress = createAsyncThunk(
    'user/fetchApiCurrentAddress',
    async (_, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiCurrentAddress());
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
