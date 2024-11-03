import {
    productReducer,
    handleUpdateFilterPr,
    clearFilterPr,
} from './product.reducer';
import { productSelector } from './product.selector';
import {
    fetchApiListProducts,
    loadMoreListProducts,
    fetchApiDetailProducts,
} from './product.api';
import { ProductData, ProductsData } from './product.types';

export {
    productReducer,
    handleUpdateFilterPr,
    clearFilterPr,

    productSelector,

    fetchApiListProducts,
    loadMoreListProducts,
    fetchApiDetailProducts,
};

export type {
    ProductData,
    ProductsData,
};
