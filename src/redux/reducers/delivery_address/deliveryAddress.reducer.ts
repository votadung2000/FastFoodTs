import { createSlice } from '@reduxjs/toolkit';

// import { handleErrorApi } from '@common';

import { CurrentAddressData } from './deliveryAddress.types';
import { fetchApiCurrentAddress } from './deliveryAddress.api';

const currentAddressData: CurrentAddressData = {
    isLoadingCurrentAddress: false,
};

const deliveryAddressSlice = createSlice({
    name: 'deliveryAddress',
    initialState: {
        currentAddress: currentAddressData,
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchApiCurrentAddress.pending, (state) => {
                state.currentAddress.isLoadingCurrentAddress = true;
            })
            .addCase(fetchApiCurrentAddress.fulfilled, (state, action) => {
                state.currentAddress.isLoadingCurrentAddress = false;
                state.currentAddress = action.payload?.data;
            })
            .addCase(fetchApiCurrentAddress.rejected, (state, action) => {
                state.currentAddress = {};
                state.currentAddress.isLoadingCurrentAddress = false;
                // handleErrorApi(action?.error);
            });
    },
});

export const deliveryAddressReducer = deliveryAddressSlice.reducer;
export const { } = deliveryAddressSlice.actions;
