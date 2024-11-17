import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { scale } from '@resolutions';

import colors from './colors';

export interface OptionImageProps {
  id?: number;
  name?: string;
  Icon: React.ComponentType<any>;
  iconProps: {
    name: string;
    size: number;
    color: string;
  };
}

const OPTION_IMAGE = {
  CAMERA: {
    id: 1,
    name: 'Camera',
    Icon: MaterialIcons,
    iconProps: {
      name: 'camera-alt',
      size: scale(26),
      color: colors.black,
    },
  },
  LIBRARY: {
    id: 2,
    name: 'Gallery',
    Icon: MaterialIcons,
    iconProps: {
      name: 'photo-library',
      size: scale(26),
      color: colors.black,
    },
  },
};

export const DATA_OPTION_IMAGE = Object.values(OPTION_IMAGE);

export default OPTION_IMAGE;
