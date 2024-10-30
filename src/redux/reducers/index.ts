import {
    authReducer,
    authSelector,
    fetchApiLogin,
    fetchApiRegister,
} from './auth';

import {
    animatedMenuReducer,
    showMenu,
    animatedMenuSelector,
} from './animated_menu';

import {
    userReducer,
    userSelector,
    fetchApiUserProfile,
    refetchApiUserProfile,
    fetchApiUpdateProfile,
    fetchApiUpdatePassword,
    updateUser,
} from './user';

import {
    categoryReducer,
    categorySelector,
    fetchApiListCategories,
    fetchCombineApiCategories,
    CategoryData,
} from './category';

import {
    productReducer,
    handleUpdateFilterPr,
    productSelector,
    fetchApiListProducts,
    ProductData,
} from './product';

import {
    locationReducer,
    handleUpdateFilterLWGeo,
    handleUpdateFilterLWAddress,
    handleUpdateGeolocation,
    locationSelector,
} from './location';

import {
    deliveryAddressReducer,
    deliveryAddressSelector,
    fetchApiCurrentAddress,
} from './delivery_address';

export {
    // auth
    authReducer,
    authSelector,
    fetchApiLogin,
    fetchApiRegister,

    // animated_menu
    animatedMenuReducer,
    showMenu,
    animatedMenuSelector,

    // user
    userReducer,
    userSelector,
    fetchApiUserProfile,
    refetchApiUserProfile,
    fetchApiUpdateProfile,
    fetchApiUpdatePassword,
    updateUser,

    // category
    categoryReducer,
    categorySelector,
    fetchApiListCategories,
    fetchCombineApiCategories,

    // product
    productReducer,
    handleUpdateFilterPr,
    productSelector,
    fetchApiListProducts,

    // location
    locationReducer,
    handleUpdateFilterLWGeo,
    handleUpdateFilterLWAddress,
    handleUpdateGeolocation,
    locationSelector,

    // delivery address
    deliveryAddressReducer,
    deliveryAddressSelector,
    fetchApiCurrentAddress,
};

export type {
    // category
    CategoryData,

    // product
    ProductData,
};
