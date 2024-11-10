import { Root } from '@common';
import { ProductData } from '@reducers';

export interface FavoriteData {
  id: number | null
  created_at: string
  updated_at: string
  user_id: number
  status: number
  product: ProductData
}

export interface FavoritesData extends Root {
  data?: FavoriteData[]
}

export interface RelatedFavoritesData {
  isLoadingFavorites?: boolean;
  isFetchingFavorites?: boolean;
  filterFavorites?: Filter;
}

export interface RequestedFilter {
  page?: number;
  perPage?: number;
  category_id?: number;
  user_id?: number;
}

export interface Filter {
  page?: number;
  perPage?: number;
  category?: any;
  user?: any;
}
