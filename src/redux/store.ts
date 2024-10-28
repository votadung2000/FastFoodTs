import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import logger from 'redux-logger'

import {
    animatedMenuReducer,
    authReducer,
    userReducer,
    categoryReducer,
    productReducer,
    locationReducer,
} from '@reducers';
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        animatedMenu: animatedMenuReducer,
        category: categoryReducer,
        product: productReducer,
        location: locationReducer,
    },
    // middleware: (getDefaultMiddleware) => {
    //     if (__DEV__) {
    //         return getDefaultMiddleware().concat(logger);
    //     }
    //     return getDefaultMiddleware();
    // },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
