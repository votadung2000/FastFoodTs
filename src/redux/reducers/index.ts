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
    clearFilterPr,
    productSelector,
    fetchApiListProducts,
    loadMoreListProducts,
    fetchApiDetailProducts,
    ProductData,
    ProductsData,
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

import {
    cartReducer,
    addToCart,
    handleUpdateCost,
    updateTotal,
    updateCost,
    plusProducts,
    minusProducts,
    removeProducts,
    clearCart,
    cartSelector,
    CartData,
} from './cart';

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
    clearFilterPr,
    productSelector,
    fetchApiListProducts,
    loadMoreListProducts,
    fetchApiDetailProducts,

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

    // cart
    cartReducer,
    addToCart,
    handleUpdateCost,
    updateTotal,
    updateCost,
    plusProducts,
    minusProducts,
    removeProducts,
    clearCart,
    cartSelector,
};

export type {
    // category
    CategoryData,

    // product
    ProductData,
    ProductsData,

    // cart
    CartData,
};
