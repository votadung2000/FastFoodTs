import { CartData } from '@reducers';

export default (item: CartData) => {
  return {
    id: item?.id,
    name: item?.name,
    image: item?.image,
    taste: item?.taste,
    price: item?.price,
    order_quantity: 1,
  };
};
