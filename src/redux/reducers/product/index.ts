import {
    productReducer,
    handleUpdateFilterPr,
} from './product.reducer';
import { productSelector } from './product.selector';
import { fetchApiListProducts } from './product.api';
import {ProductData} from './product.types';

export {
    productReducer,
    handleUpdateFilterPr,

    productSelector,

    fetchApiListProducts,
};

export type {
    ProductData,
};
