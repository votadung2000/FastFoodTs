import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiListProducts } from '@api';
import { Filter, handleApiCall } from '@common';

import { ProductsData } from './productReducer';

interface Params {
    [key: string]: any;
}

const initFilter: Filter = {
    page: 1,
    perPage: 10,
    category_id: undefined,
    name: '',
};

export const fetchApiListProducts = createAsyncThunk(
    'user/fetchApiListProducts',
    async (params: Params, { getState, rejectWithValue }) => {
        const { product } = getState() as { product: { products: ProductsData } };
        const { filterPr } = product?.products;

        try {
            const newFilter = { ...filterPr, ...initFilter, ...params };
            const filter: Filter = { ...initFilter };

            if (newFilter.category_id) {
                filter.category_id = newFilter.category_id.id;
            }
            if (newFilter.name) {
                filter.name = newFilter.name;
            }

            // Gọi API với filter đã tạo
            const response = await handleApiCall(() => ApiListProducts(filter));
            return response; // Trả về dữ liệu products
        } catch (error) {
            return rejectWithValue(error); // Trả về lỗi nếu có
        }
    }
);
