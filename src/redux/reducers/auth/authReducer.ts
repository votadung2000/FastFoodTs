import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    id: string;
    email: string;
    access_token: string;
}

const initialState: AuthState = {
    id: '',
    email: '',
    access_token: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState,
    },
    reducers: {
        updateUser: (state, action) => {
            state.authData = action.payload;
        },
    },
});

export const authReducer = authSlice.reducer;

export const { updateUser } = authSlice.actions;
