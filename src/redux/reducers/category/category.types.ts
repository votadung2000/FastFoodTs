import { Image, Root } from '@common';

import { ProductData } from '../product/product.types';

export interface CategoryData {
  id?: number | null
  created_at?: string
  updated_at?: string
  name?: string
  status?: number
  image?: Image
  products?: ProductData[]
}

export interface CategoriesData extends Root {
  data?: CategoryData[],
}

export interface RelatedCategoriesData {
  isLoadingCategories?: boolean,
}
