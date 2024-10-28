import {
    productReducer,
    handleUpdateFilter,
} from './product.reducer';
import { productSelector } from './product.selector';
import { fetchApiListProducts } from './product.api';
import {ProductData} from './product.types';

export {
    productReducer,
    handleUpdateFilter,

    productSelector,

    fetchApiListProducts,
};

export type {
    ProductData,
};
