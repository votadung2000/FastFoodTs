import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiListProducts } from '@api';
import { handleApiCall } from '@common';
import { handleUpdateFilter } from '@reducers';

import {
    Filter,
    NewFilter,
    Params,
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

            dispatch(handleUpdateFilter(newFilter));
            const response = await handleApiCall(() => ApiListProducts(filter));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
