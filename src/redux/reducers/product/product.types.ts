import { Image, Root } from '@common';

export interface ProductData {
  id?: number | null;
  created_at?: string;
  updated_at?: string;
  name?: string;
  taste?: string;
  price?: number;
  category_id?: number;
  discount?: number;
  status?: number;
  description?: string;
  quantity?: number;
  sold?: number;
  featured?: number;
  is_favorite?: boolean;
  image?: Image;
}

// products
export interface ProductsData extends Root {
  data?: ProductData[];
}

export interface RelatedProductsData {
  isLoadingProducts?: boolean;
  isFetchingProducts?: boolean;
  filterPr?: Filter;
}

export interface RequestedFilter {
  page?: number;
  perPage?: number;
  category_id?: number;
  name?: string;
}

export interface Filter {
  page?: number;
  perPage?: number;
  category?: any;
  name?: string;
}

// product detail
export interface DetailProductData extends Root {
  isLoadingDetailProduct?: boolean;
  data?: ProductData;
}
