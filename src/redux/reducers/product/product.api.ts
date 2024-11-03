import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiDetailProduct, ApiListProducts } from '@api';
import { handleApiCall, Params } from '@common';
import { handleUpdateFilterPr } from '@reducers';

import {
    Filter,
    RequestedFilter,
    ProductsData,
    RelatedProductsData,
} from './product.types';

const initFilter: Filter = {
    page: 1,
    perPage: 10,
};

export const fetchApiListProducts = createAsyncThunk(
    'product/fetchApiListProducts',
    async (params: Params = {}, { getState, dispatch, rejectWithValue }) => {
        const { product } = getState() as { product: { relatedProducts: RelatedProductsData } };
        const { filterPr } = product?.relatedProducts || {};

        try {
            const filter = { ...filterPr, ...initFilter, ...params };
            const requestedFilter: RequestedFilter = { ...initFilter };

            if (filter?.category?.id) {
                requestedFilter.category_id = filter.category.id;
            }

            if (filter?.name) {
                requestedFilter.name = filter.name;
            }

            dispatch(handleUpdateFilterPr(filter));
            const response = await handleApiCall(() => ApiListProducts(requestedFilter));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loadMoreListProducts = createAsyncThunk(
    'product/loadMoreListProducts',
    async (_, { getState, dispatch, rejectWithValue }) => {
        const { product } = getState() as { product: { relatedProducts: RelatedProductsData, products: ProductsData } };
        const { filterPr } = product?.relatedProducts || {};
        const { data } = product?.products || {};

        try {
            const filter = {
                ...filterPr,
                page: (filterPr?.page || 0) + 1,
            };
            const requestedFilter: RequestedFilter = {
                ...initFilter,
                page: (filterPr?.page || 0) + 1,
            };

            if (filter?.category?.id) {
                requestedFilter.category_id = filter.category.id;
            }
            if (filter?.name) {
                requestedFilter.name = filter.name;
            }

            dispatch(handleUpdateFilterPr(filter));
            const response = await handleApiCall(() => ApiListProducts(requestedFilter));
            return {
                ...response,
                data: data?.concat(response?.data),
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchApiDetailProducts = createAsyncThunk(
    'product/fetchApiDetailProducts',
    async (params: Params = {}, { rejectWithValue }) => {
        try {
            const response = await handleApiCall(() => ApiDetailProduct(params?.id));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
