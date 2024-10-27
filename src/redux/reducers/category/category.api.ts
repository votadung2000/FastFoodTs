import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiListCategories } from '@api';
import { handleApiCall } from '@common';
import { fetchApiListProducts } from '@reducers';

export const fetchApiListCategories = createAsyncThunk(
    'user/fetchApiListCategories',
    async (_, { rejectWithValue }) => {
        return handleApiCall(() => ApiListCategories()).catch(rejectWithValue);
    }
);

export const fetchCombineApiCategories = createAsyncThunk(
    'user/fetchCombineApiCategories',
    async (_, { dispatch, rejectWithValue }) => {
        const response = await handleApiCall(() => ApiListCategories());
        if (response?.data && response.data?.length > 0) {
            dispatch(fetchApiListProducts({
                category_id: response.data?.data[0],
            }));
        }
        return response;
    }
);
