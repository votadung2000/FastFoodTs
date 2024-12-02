import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  POPUP_MENU,
  PopupMenuProps,
  colors,
  radius,
} from '@constants';
import { useAppDispatch } from '@store';
import { fetchApiListAddress, fetchApiDeleteAddress } from '@reducers';
import { scale, wScale } from '@resolutions';

import Text from './Text';
import Notifer from './Notifer';
import ModalLoading from './Modals/ModalLoading';

const { width } = Dimensions.get('screen');

const WITH_MENU = Math.floor(width / 3);

interface PopupMenuFCProps {
  isVector?: boolean;
  data?: any;
  dataMenu?: PopupMenuProps[];
  onSelectMenu?: (data?: any) => void;
}

interface ItemCardProps {
  isVector?: boolean;
  data?: any;
  handleSelect?: (data?: any) => void;
}

interface LoadingState {
  isVisible: boolean;
  onModalHide?: () => void;
}

const ItemCard = ({ isVector, data, handleSelect }: ItemCardProps) => {
  const onSelect = () => {
    if (handleSelect) {
      handleSelect(data);
    }
  };

  return (
    <MenuOption onSelect={() => onSelect()} style={styles.btnMenu}>
      {data?.Icon && <View style={styles.vwIcon}>
        {isVector
          ? (<data.Icon {...data.iconProps} />)
          : data?.Icon
        }
      </View>}
      <Text style={styles.txtNameMenu}>{data?.name || ''}</Text>
    </MenuOption>
  );
};

const PopupMenu = ({ isVector, data, dataMenu, onSelectMenu }: PopupMenuFCProps) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<LoadingState>({ isVisible: false });

  const checkDeleted = async () => {
    try {
      setLoading({ isVisible: true });

      let response = await dispatch(fetchApiDeleteAddress(data?.id));
      if (response.payload?.status_code === 200) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            Notifer({
              alertType: 'success',
              title: 'Delete Successfully!',
            });
            await dispatch(fetchApiListAddress({}));
          },
        });
      } else {
        setLoading({ isVisible: false });
      }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  const handleSelect = (item: PopupMenuProps) => {
    if (onSelectMenu) {
      onSelectMenu(item);
    } else {
      switch (item?.id) {
        case POPUP_MENU?.DELETE?.id:
          checkDeleted();
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Menu>
        <MenuTrigger style={styles.btnDots}>
          <Entypo
            name="dots-two-horizontal"
            size={scale(19)}
            color={colors.gray_C4C4C4}
          />
        </MenuTrigger>
        <MenuOptions>
          <View style={styles.vwMenu}>
            {dataMenu?.map(item => {
              return (
                <ItemCard
                  isVector={isVector}
                  key={item?.id}
                  data={item}
                  handleSelect={handleSelect}
                />
              );
            })}
          </View>
        </MenuOptions>
      </Menu>
      <ModalLoading {...loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDots: {
    paddingLeft: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwMenu: {
    width: WITH_MENU,
    position: 'absolute',
    top: scale(15),
    right: scale(15),
    padding: scale(5),
    backgroundColor: colors.white,
    borderRadius: radius.radius4,
    zIndex: 9999,
    ...radius.shadow,
  },
  btnMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vwIcon: {
    width: wScale(28),
    height: wScale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNameMenu: {
    flex: 1,
    marginLeft: scale(5),
    color: colors.gray_9796A1,
  },
});

export default PopupMenu;
