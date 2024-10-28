import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import { fetchApiListProducts } from './product.api';
import { ProductsData } from './product.types';

const productsData: ProductsData = {
    isLoadingProducts: false,
};

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: productsData,
    },
    reducers: {
        handleUpdateFilterPr: (state, action) => {
            state.products.filterPr = action.payload;
        },
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

export const { handleUpdateFilterPr } = productSlice.actions;
