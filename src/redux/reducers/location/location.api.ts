import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    ApiApiLocationWithGeolocation,
    ApiApiLocationWithAddress,
} from '@apiLocation';
import { handleApiCall, Params } from '@common';
import { handleUpdateFilterLWGeo } from '@reducers';

import { Filter, LWGeoData, NewFilter } from './location.types';

const initFilter: NewFilter = {
    format: 'json',
    addressdetails: 1,
};

export const fetchApiLocationWithGeolocation = createAsyncThunk(
    'user/fetchApiLocationWithGeolocation',
    async (params: Params = {}, { getState, dispatch, rejectWithValue }) => {
        const { geolocation } = getState() as { geolocation: { lwGeo: LWGeoData } };
        const { filterLWGeo } = geolocation?.lwGeo || {};

        try {
            const newFilter = { ...filterLWGeo, ...initFilter, ...params };
            const filter: Filter = { ...initFilter };

            if (newFilter?.geolocation?.lat) {
                filter.lat = newFilter.geolocation.lat;
            }

            if (newFilter?.geolocation?.lon) {
                filter.lon = newFilter.geolocation.lon;
            }

            dispatch(handleUpdateFilterLWGeo(newFilter));
            const response = await handleApiCall(() => ApiApiLocationWithGeolocation(filter));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
