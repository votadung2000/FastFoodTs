import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import { fetchApiDetailProducts, fetchApiListProducts } from './product.api';
import { DetailProductData, ProductsData } from './product.types';

const productsData: ProductsData = {
    isLoadingProducts: false,
};

const detailProductData: DetailProductData = {
    isLoadingDetailProduct: false,
};

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: productsData,
        product: detailProductData,
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
            })

            .addCase(fetchApiDetailProducts.pending, (state) => {
                state.product.isLoadingDetailProduct = true;
            })
            .addCase(fetchApiDetailProducts.fulfilled, (state, action) => {
                state.product.isLoadingDetailProduct = false;
                state.product = action.payload?.data;
            })
            .addCase(fetchApiDetailProducts.rejected, (state, action) => {
                state.product.isLoadingDetailProduct = false;
                handleErrorApi(action?.error);
            });
    },
});

export const productReducer = productSlice.reducer;

export const { handleUpdateFilterPr } = productSlice.actions;
