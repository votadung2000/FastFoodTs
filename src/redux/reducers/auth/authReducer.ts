import { createSlice } from '@reduxjs/toolkit';

import { handleErrorApi } from '@common';

import {
    fetchApiLogin,
    fetchApiRegister,
} from './authApi';

interface AuthData {
    token?: string;
    created?: string;
    expiry?: number;
    isLoadingAuth?: boolean;
}

interface RegisData {
    isLoadingRegis?: boolean;
    data?: boolean;
}

const authData: AuthData = {
    isLoadingAuth: false,
};

const regisData: RegisData = {
    isLoadingRegis: false,
    data: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: authData,
        regis: regisData,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchApiLogin.pending, (state) => {
                state.auth.isLoadingAuth = true;
            })
            .addCase(fetchApiLogin.fulfilled, (state, action) => {
                state.auth.isLoadingAuth = false;
                state.auth = action.payload;
            })
            .addCase(fetchApiLogin.rejected, (state, action) => {
                state.auth.isLoadingAuth = false;
                handleErrorApi(action?.error);
            })

            .addCase(fetchApiRegister.pending, (state) => {
                state.regis.isLoadingRegis = true;
            })
            .addCase(fetchApiRegister.fulfilled, (state, action) => {
                state.regis.isLoadingRegis = false;
                state.regis.data = action.payload;
            })
            .addCase(fetchApiRegister.rejected, (state, action) => {
                state.regis.isLoadingRegis = false;
                handleErrorApi(action?.error);
            });
    },
});

export const authReducer = authSlice.reducer;

export const { } = authSlice.actions;
