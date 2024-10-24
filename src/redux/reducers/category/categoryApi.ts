import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiListCategories } from '@api';
import { handleApiCall } from '@common';

export const fetchApiListCategories = createAsyncThunk(
    'user/fetchApiListCategories',
    async (_, { rejectWithValue }) => {
        return handleApiCall(() => ApiListCategories()).catch(rejectWithValue);
    }
);
