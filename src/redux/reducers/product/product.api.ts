import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiDetailProduct, ApiListProducts } from '@api';
import { handleApiCall, Params } from '@common';
import { handleUpdateFilterPr } from '@reducers';

import {
    Filter,
    NewFilter,
    ProductsData,
} from './product.types';

const initFilter: NewFilter = {
    page: 1,
    perPage: 10,
};

export const fetchApiListProducts = createAsyncThunk(
    'user/fetchApiListProducts',
    async (params: Params = {}, { getState, dispatch, rejectWithValue }) => {
        const { product } = getState() as { product: { products: ProductsData } };
        const { filterPr } = product?.products || {};

        try {
            const newFilter = { ...filterPr, ...initFilter, ...params };
            const filter: Filter = { ...initFilter };

            if (newFilter?.category?.id) {
                filter.category_id = newFilter.category.id;
            }
            if (newFilter?.name) {
                filter.name = newFilter.name;
            }

            dispatch(handleUpdateFilterPr(newFilter));
            const response = await handleApiCall(() => ApiListProducts(filter));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiDetailProducts = createAsyncThunk(
    'user/fetchApiDetailProducts',
    async (params: Params = {}, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiDetailProduct(params?.id));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
