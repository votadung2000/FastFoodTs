import { Image, Root } from '@common';

export interface ProductData {
  id?: number | null
  created_at?: string
  updated_at?: string
  name?: string
  taste?: string
  price?: number
  category_id?: number
  discount?: number
  status?: number
  description?: string
  quantity?: number
  sold?: number
  featured?: number
  is_favorite?: boolean
  image?: Image
}

export interface ProductsData extends Root {
  isLoadingProducts?: boolean,
  data?: ProductData[],
  filterPr?: NewFilter,
}

export interface Params {
  [key: string]: any;
}

export interface Filter {
  page?: number,
  perPage?: number,
  category_id?: any,
  name?: string,
}

export interface NewFilter {
  page?: number,
  perPage?: number,
  category?: any,
  name?: string,
}