import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import {
    CurrentAddressData,
    AddressData,
    RelatedAddressData,
} from './deliveryAddress.types';
import {
    fetchApiCurrentAddress,
    fetchApiDeleteAddress,
    fetchApiListAddress,
} from './deliveryAddress.api';

const currentAddressData: CurrentAddressData = {
    isLoadingCurrentAddress: false,
};

const addressData: AddressData = {};
const relatedAddressData: RelatedAddressData = {
    isLoadingAddress: false,
};

const deliveryAddressSlice = createSlice({
    name: 'deliveryAddress',
    initialState: {
        currentAddress: currentAddressData,
        address: addressData,
        relatedAddress: relatedAddressData,
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
            .addCase(fetchApiCurrentAddress.rejected, (state) => {
                state.currentAddress = {};
                state.currentAddress.isLoadingCurrentAddress = false;
            })

            .addCase(fetchApiListAddress.pending, (state) => {
                state.relatedAddress.isLoadingAddress = true;
            })
            .addCase(fetchApiListAddress.fulfilled, (state, action) => {
                state.relatedAddress.isLoadingAddress = false;
                state.address = action.payload;
            })
            .addCase(fetchApiListAddress.rejected, (state, action) => {
                state.relatedAddress.isLoadingAddress = false;
                handleErrorApi(action?.error);
            })

            .addCase(fetchApiDeleteAddress.rejected, (_, action) => {
                handleErrorApi(action?.error);
            });
    },
});

export const deliveryAddressReducer = deliveryAddressSlice.reducer;
export const { } = deliveryAddressSlice.actions;
