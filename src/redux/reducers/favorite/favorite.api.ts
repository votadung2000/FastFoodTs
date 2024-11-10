import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiFavorites } from '@api';
import { handleApiCall, Params } from '@common';
import { updateFilterFavorites } from '@reducers';

import { Filter, RelatedFavoritesData, RequestedFilter } from './favorite.types';

const initFilter: Filter = {
  page: 1,
  perPage: 10,
};

export const fetchApiListFavorites = createAsyncThunk(
  'favorite/fetchApiListFavorites',
  async (params: Params = {}, { getState, dispatch, rejectWithValue }) => {
    const { favorite } = getState() as { favorite: { relatedFavorites: RelatedFavoritesData } };
    const { filterFavorites } = favorite?.relatedFavorites || {};

    try {
      const filter = { ...filterFavorites, ...initFilter, ...params };
      const requestedFilter: RequestedFilter = { ...initFilter };

      if (filter?.category?.id) {
        requestedFilter.category_id = filter.category.id;
      }

      if (filter?.user) {
        requestedFilter.user_id = filter.user.id;
      }

      dispatch(updateFilterFavorites(filter));
      const response = await handleApiCall(() => ApiFavorites(requestedFilter));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
