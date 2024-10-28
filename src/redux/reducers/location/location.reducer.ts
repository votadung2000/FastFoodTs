import { createSlice } from '@reduxjs/toolkit';
import { LWGeoData } from './location.types';

const lwGeoData: LWGeoData = {
    isLoadingLocation: false,
};

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        lwGeo: lwGeoData,
    },
    reducers: {
        handleUpdateFilterLWGeo: (state, action) => {
            state.lwGeo.filterLWGeo = action.payload;
        },
    },
    extraReducers(builder) {

    },
});

export const locationReducer = locationSlice.reducer;

export const { handleUpdateFilterLWGeo } = locationSlice.actions;
