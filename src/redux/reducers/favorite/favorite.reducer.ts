import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import {
  FavoritesData,
  RelatedFavoritesData,
} from './favorite.types';
import {
  fetchApiCDFavorite,
  fetchApiListFavorites,
  loadMoreListFavorites,
} from './favorite.api';

const favoritesData: FavoritesData = {};
const relatedFavoritesData: RelatedFavoritesData = {
  isLoadingFavorites: false,
  isFetchingFavorites: false,
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorites: favoritesData,
    relatedFavorites: relatedFavoritesData,
  },
  reducers: {
    updateFilterFavorites: (state, action) => {
      state.relatedFavorites.filterFavorites = action.payload;
    },
    clearFilterFavorites(state) {
      state.relatedFavorites.filterFavorites = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchApiListFavorites.pending, (state) => {
        state.relatedFavorites.isLoadingFavorites = true;
      })
      .addCase(fetchApiListFavorites.fulfilled, (state, action) => {
        state.relatedFavorites.isLoadingFavorites = false;
        state.favorites = action.payload;
      })
      .addCase(fetchApiListFavorites.rejected, (state, action) => {
        state.relatedFavorites.isLoadingFavorites = false;
        handleErrorApi(action?.error);
      })

      .addCase(loadMoreListFavorites.pending, (state) => {
        state.relatedFavorites.isFetchingFavorites = true;
      })
      .addCase(loadMoreListFavorites.fulfilled, (state, action) => {
        state.relatedFavorites.isFetchingFavorites = false;
        state.favorites = action.payload;
      })
      .addCase(loadMoreListFavorites.rejected, (state, action) => {
        state.relatedFavorites.isFetchingFavorites = false;
        handleErrorApi(action?.error);
      })

      .addCase(fetchApiCDFavorite.rejected, (_, action) => {
        handleErrorApi(action?.error);
      });
  },
});

export const favoriteReducer = favoriteSlice.reducer;
export const {
  updateFilterFavorites,
  clearFilterFavorites,
} = favoriteSlice.actions;
