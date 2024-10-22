import { configureStore } from '@reduxjs/toolkit';

import { animatedMenuReducer, authReducer, userReducer } from '@reducers';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        animatedMenu: animatedMenuReducer,
    },
});

export default store;
