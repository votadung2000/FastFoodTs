import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiListCategories } from '@api';
import { handleApiCall } from '@common';
import { fetchApiListProducts } from '@reducers';

export const fetchApiListCategories = createAsyncThunk(
    'user/fetchApiListCategories',
    async (_, { rejectWithValue }) => {
        try {
            return handleApiCall(() => ApiListCategories());
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchCombineApiCategories = createAsyncThunk(
    'user/fetchCombineApiCategories',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiListCategories());
            if (response?.status_code === 200) {
                dispatch(fetchApiListProducts({
                    category_id: response.data?.data[0],
                }));
            }
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
