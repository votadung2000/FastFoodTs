import { Root } from '@common';
import { ProductData } from '@reducers';

export interface OrderItem {
  id?: number | null;
  created_at?: string;
  updated_at?: string;
  status?: number;
  quantity?: number;
  price?: number;
  product?: ProductData;
}

export interface OrderData {
  id?: number;
  user_id?: number;
  status?: number;
  tax_fees?: number;
  delivery_fee?: number;
  total?: number;
  coupon_id?: number;
  created_at?: string;
  canceled_at?: any;
  completed_at?: any;
  delivery_at?: any;
  order_item?: OrderItem[];
}

export interface OrdersData extends Root {
  data?: OrderData[];
}

export interface RelatedOrdersData {
  isLoadingOrders?: boolean;
}

export interface RelatedOrderData {
  isLoadingOrder?: boolean;
}
