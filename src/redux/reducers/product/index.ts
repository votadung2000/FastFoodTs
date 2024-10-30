import {
    productReducer,
    handleUpdateFilterPr,
} from './product.reducer';
import { productSelector } from './product.selector';
import {
    fetchApiListProducts,
    fetchApiDetailProducts,
} from './product.api';
import { ProductData } from './product.types';

export {
    productReducer,
    handleUpdateFilterPr,

    productSelector,

    fetchApiListProducts,
    fetchApiDetailProducts,
};

export type {
    ProductData,
};
