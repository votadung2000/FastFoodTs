import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { scale } from '@resolutions';

import colors from './colors';

export interface PopupMenuProps {
  id?: number;
  name?: string;
  Icon: React.ComponentType<any>;
  iconProps: {
    name: string;
    size: number;
    color: string;
  };
}

const POPUP_MENU = {
  DELETE: {
    id: 1,
    name: 'Delete',
    Icon: AntDesign,
    iconProps: {
      name: 'close',
      size: scale(16),
      color: colors.red_FF3600,
    },
  },
};

export const DATA_POPUP_MENU = Object.values(POPUP_MENU);

export default POPUP_MENU;
