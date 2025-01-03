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
    UserData,
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
    fetchApiLocationWithAddress,
    fetchApiLocationWithGeolocation,
} from './location';

import {
    deliveryAddressReducer,
    clearDetailAddress,
    deliveryAddressSelector,
    fetchApiCurrentAddress,
    fetchApiListAddress,
    fetchApiDeleteAddress,
    fetchApiDetailAddress,
    fetchApiCreateAddress,
    fetchApiUpdateAddress,
    DeliveryAddressData,
} from './delivery_address';

import {
    cartReducer,
    addToCart,
    plusProducts,
    minusProducts,
    removeProducts,
    clearCart,
    cartSelector,
    CartData,
} from './cart';

import {
    orderReducer,
    fetchRating,
    handleTabSwitch,
    initTab,
    orderSelector,
    fetchApiCreateOrder,
    fetchApiListOrder,
    fetchApiDetailOrder,
    fetchApiUpdateOrder,
    OrderData,
    OrderItem,
} from './order';

import {
    favoriteReducer,
    updateFilterFavorites,
    clearFilterFavorites,
    favoriteSelector,
    fetchApiListFavorites,
    loadMoreListFavorites,
    fetchApiCDFavorite,
    FavoritesData,
    FavoriteData,
} from './favorite';

import {
    uploadReducer,
    uploadSelector,
    fetchApiUploadImg,
} from './upload';

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
    fetchApiLocationWithAddress,
    fetchApiLocationWithGeolocation,

    // delivery address
    deliveryAddressReducer,
    clearDetailAddress,
    deliveryAddressSelector,
    fetchApiCurrentAddress,
    fetchApiListAddress,
    fetchApiDeleteAddress,
    fetchApiDetailAddress,
    fetchApiCreateAddress,
    fetchApiUpdateAddress,

    // cart
    cartReducer,
    addToCart,
    plusProducts,
    minusProducts,
    removeProducts,
    clearCart,
    cartSelector,

    // order
    orderReducer,
    fetchRating,
    handleTabSwitch,
    initTab,
    orderSelector,
    fetchApiCreateOrder,
    fetchApiListOrder,
    fetchApiDetailOrder,
    fetchApiUpdateOrder,

    // favorite
    favoriteReducer,
    updateFilterFavorites,
    clearFilterFavorites,
    favoriteSelector,
    fetchApiListFavorites,
    loadMoreListFavorites,
    fetchApiCDFavorite,

    // upload
    uploadReducer,
    uploadSelector,
    fetchApiUploadImg,
};

export type {
    // user
    UserData,

    // category
    CategoryData,

    // product
    ProductData,
    ProductsData,

    // delivery address
    DeliveryAddressData,

    // cart
    CartData,

    // order
    OrderData,
    OrderItem,

    // favorite
    FavoritesData,
    FavoriteData,
};
