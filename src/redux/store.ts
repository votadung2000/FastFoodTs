import { configureStore } from '@reduxjs/toolkit';

import { animatedMenuReducer, authReducer } from '@reducers';

const store = configureStore({
    reducer: {
        auth: authReducer,
        animatedMenu: animatedMenuReducer,
    },
});

export default store;
