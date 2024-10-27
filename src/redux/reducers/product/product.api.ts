import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiListProducts } from '@api';
import { handleApiCall } from '@common';

import { ProductsData } from './product.reducer';

interface Params {
    [key: string]: any;
}

interface Filter {
    page?: number,
    perPage?: number,
    category_id?: any,
    name?: string,
}

interface NewFilter {
    page?: number,
    perPage?: number,
    category?: any,
    name?: string,
}

const initFilter: NewFilter = {
    page: 1,
    perPage: 10,
};

export const fetchApiListProducts = createAsyncThunk(
    'user/fetchApiListProducts',
    async (params: Params = {}, { getState, dispatch, rejectWithValue }) => {
        const { product } = getState() as { product: { products: ProductsData } };
        const { filterPr } = product?.products as { filterPr: Filter };

        try {
            const newFilter = { ...filterPr, ...initFilter, ...params };
            const filter: Filter = { ...initFilter };

            if (newFilter.category) {
                filter.category_id = newFilter.category.id;
            }
            if (newFilter.name) {
                filter.name = newFilter.name;
            }

            const response = await handleApiCall(() => ApiListProducts(filter));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
