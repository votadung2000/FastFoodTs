import { Image } from '@common';

export interface CartData {
  id?: number | null;
  name?: string;
  image?: Image;
  taste?: string;
  price?: number;
  order_quantity?: number;
}
