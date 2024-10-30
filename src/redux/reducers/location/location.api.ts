import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    ApiApiLocationWithGeolocation,
    ApiApiLocationWithAddress,
} from '@apiLocation';
import { handleApiCall, Params } from '@common';
import { handleUpdateFilterLWAddress, handleUpdateFilterLWGeo } from '@reducers';

import {
    FilterLWAddress,
    FilterLWGeo,
    LWAddressData,
    LWGeoData,
    NewFilterLWAddress,
    NewFilterLWGeo,
} from './location.types';

const initFilterLWGeo: NewFilterLWGeo = {
    format: 'json',
    addressdetails: 1,
};

const initFilterLWAddress: NewFilterLWAddress = {
    format: 'json',
    addressdetails: 1,
};

export const fetchApiLocationWithGeolocation = createAsyncThunk(
    'location/fetchApiLocationWithGeolocation',
    async (params: Params = {}, { getState, dispatch, rejectWithValue }) => {
        const { geolocation } = getState() as { geolocation: { lwGeo: LWGeoData } };
        const { filterLWGeo } = geolocation?.lwGeo || {};

        try {
            const newFilter = { ...filterLWGeo, ...initFilterLWGeo, ...params };
            const filter: FilterLWGeo = { ...initFilterLWGeo };

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

export const fetchApiLocationWithAddress = createAsyncThunk(
    'location/fetchApiLocationWithAddress',
    async (params: Params = {}, { getState, dispatch, rejectWithValue }) => {
        const { geolocation } = getState() as { geolocation: { lwAddress: LWAddressData } };
        const { filterLWAddress } = geolocation?.lwAddress || {};

        try {
            const newFilter = { ...filterLWAddress, ...initFilterLWAddress, ...params };
            const filter: FilterLWAddress = { ...initFilterLWAddress };

            if (newFilter?.address) {
                filter.q = newFilter.address;
            }

            dispatch(handleUpdateFilterLWAddress(newFilter));
            const response = await handleApiCall(() => ApiApiLocationWithAddress(filter));
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
