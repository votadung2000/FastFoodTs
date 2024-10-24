import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import {
    fetchApiUserProfile,
} from './userApi';

interface UserData {
    id?: number | null;
    created_at?: string;
    updated_at?: string;
    name?: string;
    user_name?: string;
    status?: number;
    phone_number?: string;
    email?: string;
    address?: string;
    role?: number;
    avatar?: string | null;
    isLoadingUser?: boolean;
}

const userData: UserData = {
    isLoadingUser: false,
};

const userSlice = createSlice({
    name: 'auth',
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
                state.user = action.payload;
            })
            .addCase(fetchApiUserProfile.rejected, (state, action) => {
                state.user.isLoadingUser = false;
                handleErrorApi(action?.error);
            });
    },
});

export const userReducer = userSlice.reducer;

export const { updateUser } = userSlice.actions;
