import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SVG_Type_Home, SVG_Type_Office } from '@svg';
import { wScale } from '@resolutions';

import colors from './colors';

export interface TypeDeliveryAddressProps {
  id?: number;
  name?: string;
  type?: number;
  Icon?: React.ComponentType<any>;
  iconProps?: {
    name?: string;
    size?: number;
    color?: string;
    width?: number;
    height?: number;
  };
}

const TYPE = {
  HOME: {
    id: 1,
    name: 'Home',
    type: 1,
    Icon: SVG_Type_Home,
    iconProps: {
      width: wScale(24),
      height: wScale(24),
    },
  },
  OFFICE: {
    id: 2,
    name: 'Office',
    type: 2,
    Icon: SVG_Type_Office,
    iconProps: {
      width: wScale(24),
      height: wScale(24),
    },
  },
  OTHER: {
    id: 3,
    name: 'Other',
    type: 3,
    Icon: MaterialIcons,
    iconProps: {
      name: 'add-location-alt',
      size: wScale(24),
      color: colors.orange_FFC529,
    },
  },
};

export const DATA_TYPE_DELIVERY_ADDRESS = Object.values(TYPE);

export const findTypeDeliveryAddress = (type: number) => {
  return DATA_TYPE_DELIVERY_ADDRESS.find(ele => ele?.type === type);
};

export default TYPE;
