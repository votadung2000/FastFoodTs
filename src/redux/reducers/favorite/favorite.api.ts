import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiFavorites } from '@api';
import { handleApiCall, Params } from '@common';
import { updateFilterFavorites, UserData } from '@reducers';

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

    const { user } = getState() as { user: { user: UserData } };
    const userId = user?.user?.id;

    try {
      const filter = { ...filterFavorites, ...initFilter, ...params };
      const requestedFilter: RequestedFilter = { ...initFilter };

      if (filter?.category?.id) {
        requestedFilter.category_id = filter.category.id;
      }

      if (userId) {
        requestedFilter.user_id = userId;
      }

      dispatch(updateFilterFavorites(filter));
      const response = await handleApiCall(() => ApiFavorites(requestedFilter));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
