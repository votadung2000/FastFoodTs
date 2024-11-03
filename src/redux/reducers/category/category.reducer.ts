import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import { fetchApiListCategories, fetchCombineApiCategories } from './category.api';
import { CategoriesData, RelatedCategoriesData } from './category.types';

const categoriesData: CategoriesData = {};

const relatedCategoriesData: RelatedCategoriesData = {
  isLoadingCategories: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: categoriesData,
    relatedCategories: relatedCategoriesData,
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchApiListCategories.pending, (state) => {
        state.relatedCategories.isLoadingCategories = true;
      })
      .addCase(fetchApiListCategories.fulfilled, (state, action) => {
        state.relatedCategories.isLoadingCategories = false;
        state.categories = action.payload;
      })
      .addCase(fetchApiListCategories.rejected, (state, action) => {
        state.relatedCategories.isLoadingCategories = false;
        handleErrorApi(action?.error);
      })

      .addCase(fetchCombineApiCategories.pending, (state) => {
        state.relatedCategories.isLoadingCategories = true;
      })
      .addCase(fetchCombineApiCategories.fulfilled, (state, action) => {
        state.relatedCategories.isLoadingCategories = false;
        state.categories = action.payload;
      })
      .addCase(fetchCombineApiCategories.rejected, (state, action) => {
        state.relatedCategories.isLoadingCategories = false;
        handleErrorApi(action?.error);
      })
      ;
  },
});

export const categoryReducer = categorySlice.reducer;

export const { } = categorySlice.actions;
