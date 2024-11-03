import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import {
    fetchApiDetailProducts,
    fetchApiListProducts,
    loadMoreListProducts,
} from './product.api';
import { DetailProductData, ProductsData, RelatedProductsData } from './product.types';

const productsData: ProductsData = {};
const relatedProductsData: RelatedProductsData = {
    isLoadingProducts: false,
    isFetchingProducts: false,
};

const detailProductData: DetailProductData = {
    isLoadingDetailProduct: false,
};

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: productsData,
        relatedProducts: relatedProductsData,
        product: detailProductData,
    },
    reducers: {
        handleUpdateFilterPr: (state, action) => {
            state.relatedProducts.filterPr = action.payload;
        },
        clearFilterPr: (state) => {
            state.relatedProducts.filterPr = {};
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchApiListProducts.pending, (state) => {
                state.relatedProducts.isLoadingProducts = true;
            })
            .addCase(fetchApiListProducts.fulfilled, (state, action) => {
                state.relatedProducts.isLoadingProducts = false;
                state.products = action.payload;
            })
            .addCase(fetchApiListProducts.rejected, (state, action) => {
                state.relatedProducts.isLoadingProducts = false;
                handleErrorApi(action?.error);
            })

            .addCase(loadMoreListProducts.pending, (state) => {
                state.relatedProducts.isFetchingProducts = true;
            })
            .addCase(loadMoreListProducts.fulfilled, (state, action) => {
                state.relatedProducts.isFetchingProducts = false;
                state.products = action.payload;
            })
            .addCase(loadMoreListProducts.rejected, (state, action) => {
                state.relatedProducts.isFetchingProducts = false;
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

export const {
    handleUpdateFilterPr,
    clearFilterPr,
} = productSlice.actions;
