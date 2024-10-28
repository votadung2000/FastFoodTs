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
};

export type {
    // category
    CategoryData,

    // product
    ProductData,
};
