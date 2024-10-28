import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import { LWAddressData, LWGeoData } from './location.types';
import {
    fetchApiLocationWithGeolocation,
    fetchApiLocationWithAddress,
} from './location.api';

const lwGeoData: LWGeoData = {
    isLoadingLWGeo: false,
};

const lwAddressData: LWAddressData = {
    isLoadingLWAddress: false,
};

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        lwGeo: lwGeoData,
        lwAddress: lwAddressData,
    },
    reducers: {
        handleUpdateFilterLWGeo: (state, action) => {
            state.lwGeo.filterLWGeo = action.payload;
        },
        handleUpdateFilterLWAddress: (state, action) => {
            state.lwAddress.filterLWAddress = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchApiLocationWithGeolocation.pending, (state) => {
                state.lwGeo.isLoadingLWGeo = true;
            })
            .addCase(fetchApiLocationWithGeolocation.fulfilled, (state, action) => {
                state.lwGeo.isLoadingLWGeo = false;
                state.lwGeo = action.payload;
            })
            .addCase(fetchApiLocationWithGeolocation.rejected, (state, action) => {
                state.lwGeo.isLoadingLWGeo = false;
                handleErrorApi(action?.error);
            })

            .addCase(fetchApiLocationWithAddress.pending, (state) => {
                state.lwAddress.isLoadingLWAddress = true;
            })
            .addCase(fetchApiLocationWithAddress.fulfilled, (state, action) => {
                state.lwAddress.isLoadingLWAddress = false;
                state.lwAddress = action.payload;
            })
            .addCase(fetchApiLocationWithAddress.rejected, (state, action) => {
                state.lwAddress.isLoadingLWAddress = false;
                handleErrorApi(action?.error);
            });
    },
});

export const locationReducer = locationSlice.reducer;

export const {
    handleUpdateFilterLWGeo,
    handleUpdateFilterLWAddress,
} = locationSlice.actions;
