import { createSlice } from '@reduxjs/toolkit';

import { Filter, handleErrorApi, Image, Root } from '@common';

import { fetchApiListProducts } from './product.api';

interface ProductData {
    id?: number | null
    created_at?: string
    updated_at?: string
    name?: string
    taste?: string
    price?: number
    category_id?: number
    discount?: number
    status?: number
    description?: string
    quantity?: number
    sold?: number
    featured?: number
    is_favorite?: boolean
    image?: Image
}

export interface ProductsData extends Root {
    isLoadingProducts?: boolean,
    data?: ProductData[],
    filterPr?: Filter,
}

const productsData: ProductsData = {
    isLoadingProducts: false,
};

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: productsData,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchApiListProducts.pending, (state) => {
                state.products.isLoadingProducts = true;
            })
            .addCase(fetchApiListProducts.fulfilled, (state, action) => {
                state.products.isLoadingProducts = false;
                state.products = action.payload;
            })
            .addCase(fetchApiListProducts.rejected, (state, action) => {
                state.products.isLoadingProducts = false;
                handleErrorApi(action?.error);
            });
    },
});

export const productReducer = productSlice.reducer;

export const { } = productSlice.actions;
