import { createSlice } from '@reduxjs/toolkit';

export interface UserData {
    token: string
    created: string
    expiry: number
}

const userData: UserData = {
    token: '',
    created: '',
    expiry: 0,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userData,
    },
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const authReducer = authSlice.reducer;

export const { updateUser } = authSlice.actions;
