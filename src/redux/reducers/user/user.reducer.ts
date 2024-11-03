import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import {
    fetchApiUserProfile,
} from './user.api';
import { UserData } from './user.types';

const userData: UserData = {
    isLoadingUser: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userData,
    },
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchApiUserProfile.pending, (state) => {
                state.user.isLoadingUser = true;
            })
            .addCase(fetchApiUserProfile.fulfilled, (state, action) => {
                state.user.isLoadingUser = false;
                state.user = action.payload?.data;
            })
            .addCase(fetchApiUserProfile.rejected, (state, action) => {
                state.user.isLoadingUser = false;
                handleErrorApi(action?.error);
            });
    },
});

export const userReducer = userSlice.reducer;

export const { updateUser } = userSlice.actions;
