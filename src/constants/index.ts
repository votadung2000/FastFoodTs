import * as fontSize from './fontSize';
import colors from './colors';
import radius from './radius';

import DATA_CAROUSEL from './dataCarousel';
import OPTION_IMAGE, { DATA_OPTION_IMAGE, OptionImageProps } from './dataOptionImage';
import TAB_ORDER, { DATA_TAB_ORDER, TabOrderProps } from './dataTabOrder';
import POPUP_MENU, { DATA_POPUP_MENU, PopupMenuProps } from './dataPopupMenu';
/* The line `// import TAB_ORDER, {DATA_TAB_ORDER} from './dataTabOrder';` is a commented-out import
statement in TypeScript. It is not being used in the current code but seems to be a reference to
importing `TAB_ORDER` and `DATA_TAB_ORDER` from the file `dataTabOrder`. */

// import STATUS_NOTIFY, {
//   STATUS_SETTING_NOTIFY,
//   checkStatusReadNotify,
//   checkStatusOnNotify,
// } from './statusNotify';

import STATUS_ORDER, {
  DATA_STATUS_ORDER,
  findStatusOrder,
  checkStatusWaitingOrder,
  checkStatusCancelOrder,
  checkStatusFinishOrder,
} from './statusOrder';

import TYPE_DELIVERY_ADDRESS, {
  DATA_TYPE_DELIVERY_ADDRESS,
  findTypeDeliveryAddress,
  TypeDeliveryAddressProps,
} from './typeDeliveryAddress';
// import TYPE_RATING, {DATA_TYPE_RATING, findTypeRating} from './typeRating';

import DEFAULT_DELIVERY_ADDRESS, {
  DATA_DEFAULT_DELIVERY_ADDRESS,
  findDefaultDeliveryAddress,
  checkDefaultDeliveryAddress,
  DefaultDeliveryAddressProps,
} from './defaultDeliveryAddress';

export {
  colors,
  fontSize,
  radius,

  DATA_CAROUSEL,

  OPTION_IMAGE,
  DATA_OPTION_IMAGE,

  TAB_ORDER,
  DATA_TAB_ORDER,

  POPUP_MENU,
  DATA_POPUP_MENU,

  // STATUS_NOTIFY,
  // STATUS_SETTING_NOTIFY,
  // checkStatusReadNotify,
  // checkStatusOnNotify,

  STATUS_ORDER,
  DATA_STATUS_ORDER,
  findStatusOrder,
  checkStatusWaitingOrder,
  checkStatusCancelOrder,
  checkStatusFinishOrder,

  TYPE_DELIVERY_ADDRESS,
  DATA_TYPE_DELIVERY_ADDRESS,
  findTypeDeliveryAddress,

  // TYPE_RATING,
  // DATA_TYPE_RATING,
  // findTypeRating,

  DEFAULT_DELIVERY_ADDRESS,
  DATA_DEFAULT_DELIVERY_ADDRESS,
  findDefaultDeliveryAddress,
  checkDefaultDeliveryAddress,
};

export type {
  TabOrderProps,
  OptionImageProps,
  PopupMenuProps,
  TypeDeliveryAddressProps,
  DefaultDeliveryAddressProps,
};
