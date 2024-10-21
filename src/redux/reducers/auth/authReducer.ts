import { createSlice } from '@reduxjs/toolkit';

import { Notifer } from '@components';

import {
    fetchApiLogin,
    fetchApiUserProfile,
} from './authApi';

interface AuthData {
    token?: string;
    created?: string;
    expiry?: number;
    isLoadingAuth?: boolean;
}

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

const authData: AuthData = {
    token: '',
    created: '',
    expiry: 0,
    isLoadingAuth: false,
};

const userData: UserData = {
    id: null,
    created_at: '',
    updated_at: '',
    name: '',
    user_name: '',
    status: 0,
    phone_number: '',
    email: '',
    address: '',
    role: 0,
    avatar: null,
    isLoadingUser: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: authData,
        user: userData,
    },
    reducers: {
        updateUser: (state, action) => {
            state.auth = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchApiLogin.pending, (state) => {
                state.auth.isLoadingAuth = true;
            })
            .addCase(fetchApiLogin.fulfilled, (state, action) => {
                state.auth.isLoadingAuth = false;
                state.auth = action.payload?.data;
            })
            .addCase(fetchApiLogin.rejected, (state, action) => {
                state.auth.isLoadingAuth = false;
                Notifer({
                    alertType: 'error',
                    title: action.error?.message || '',
                });
            })

            .addCase(fetchApiUserProfile.pending, (state) => {
                state.user.isLoadingUser = true;
            })
            .addCase(fetchApiUserProfile.fulfilled, (state, action) => {
                state.user.isLoadingUser = false;
                state.auth = action.payload?.data;
            })
            .addCase(fetchApiUserProfile.rejected, (state, action) => {
                state.user.isLoadingUser = false;
                Notifer({
                    alertType: 'error',
                    title: action.error?.message || '',
                });
            });
    },
});

export const authReducer = authSlice.reducer;

export const { updateUser } = authSlice.actions;
