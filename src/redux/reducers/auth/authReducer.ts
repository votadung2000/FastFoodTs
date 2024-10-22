import { createSlice } from '@reduxjs/toolkit';

import { Notifer } from '@components';

import {
    fetchApiLogin,
} from './authApi';

interface AuthData {
    token?: string;
    created?: string;
    expiry?: number;
    isLoadingAuth?: boolean;
}

const authData: AuthData = {
    token: '',
    created: '',
    expiry: 0,
    isLoadingAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: authData,
    },
    reducers: { },
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
            });
    },
});

export const authReducer = authSlice.reducer;

export const {  } = authSlice.actions;
