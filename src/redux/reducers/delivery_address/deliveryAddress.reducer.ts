import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import {
    CurrentAddressData,
    AddressData,
    RelatedAddressData,
    DetailAddressData,
} from './deliveryAddress.types';
import {
    fetchApiCreateAddress,
    fetchApiCurrentAddress,
    fetchApiDeleteAddress,
    fetchApiDetailAddress,
    fetchApiListAddress,
    fetchApiUpdateAddress,
} from './deliveryAddress.api';

const currentAddressData: CurrentAddressData = {
    isLoadingCurrentAddress: false,
};

const addressData: AddressData = {};
const relatedAddressData: RelatedAddressData = {
    isLoadingAddress: false,
};

const detailAddressData: DetailAddressData = {
    isLoadingDetailAddress: false,
};

const deliveryAddressSlice = createSlice({
    name: 'deliveryAddress',
    initialState: {
        currentAddress: currentAddressData,
        address: addressData,
        relatedAddress: relatedAddressData,
        detailAddress: detailAddressData,
    },
    reducers: {
        clearDetailAddress: (state) => {
            state.detailAddress = {};
        },
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
            })

            .addCase(fetchApiDetailAddress.pending, (state) => {
                state.detailAddress.isLoadingDetailAddress = true;
            })
            .addCase(fetchApiDetailAddress.fulfilled, (state, action) => {
                state.detailAddress.isLoadingDetailAddress = false;
                state.detailAddress = action.payload?.data;
            })
            .addCase(fetchApiDetailAddress.rejected, (state, action) => {
                state.detailAddress.isLoadingDetailAddress = false;
                handleErrorApi(action?.error);
            })

            .addCase(fetchApiCreateAddress.rejected, (_, action) => {
                handleErrorApi(action?.error);
            })

            .addCase(fetchApiUpdateAddress.rejected, (_, action) => {
                handleErrorApi(action?.error);
            });
    },
});

export const deliveryAddressReducer = deliveryAddressSlice.reducer;
export const { clearDetailAddress } = deliveryAddressSlice.actions;
