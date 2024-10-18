import { createSlice } from '@reduxjs/toolkit';

interface AnimatedMenu {
    triggerMenu: boolean;
}

const initialState: AnimatedMenu = {
    triggerMenu: false,
};

const animatedMenuSlice = createSlice({
    name: 'animatedMenu',
    initialState,
    reducers: {
        showMenu: (state) => {
            state.triggerMenu = !state.triggerMenu;
        },
    },
});

export const animatedMenuReducer = animatedMenuSlice.reducer;

export const { showMenu } = animatedMenuSlice.actions;
