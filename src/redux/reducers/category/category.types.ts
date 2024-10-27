import { Image } from '@common';

import { ProductData } from '../product/product.types';

export type CategoryData = {
  id?: number | null
  created_at?: string
  updated_at?: string
  name?: string
  status?: number
  image?: Image
  products?: ProductData[]
}

export interface CategoriesData {
  isLoadingCategories?: boolean,
  data?: CategoryData[],
}
