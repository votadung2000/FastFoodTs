import { configureStore } from '@reduxjs/toolkit';

import { animatedMenuReducer, authReducer, userReducer } from '@reducers';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        animatedMenu: animatedMenuReducer,
    },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
