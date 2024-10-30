import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Text, FastImage, Popup, PopupProps } from '@components';
import {
  SVG_My_Order,
  SVG_Profile,
  SVG_Delivery_Address,
  SVG_Payment,
  SVG_Contact,
  SVG_Setting,
  SVG_Helps,
} from '@svg';
import { clearToken } from '@storage';
import { useSelector } from 'react-redux';
import { updateUser, userSelector } from '@reducers';
import { useAppDispatch } from '@store';
import { colors, fontSize } from '@constants';
import { hScale, scale, wScale } from '@resolutions';
import routes from '@routes';

import ItemMenu from './ItemMenu';

interface PopupState extends PopupProps {
  isVisible: boolean;
  onModalHide?: () => void;
}

const Menu = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const { user } = useSelector(userSelector);

  // const {
  //   orderStore: {orders, fetchApiListOrder},
  // } = useStore();

  const [popup, setPopup] = useState<PopupState>({ isVisible: false });

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchApiListOrder({is_upcoming: true});
  //   }, []),
  // );

  const handleNav = (screen: string) => {
    navigation.navigate(screen);
  };

  const handleConfirmLogOut = () => {
    setPopup({
      isVisible: true,
      title: 'Attention',
      accept: 'Sign Out',
      content: 'Do you want to sign out?',
      handleAccept: handleAccept,
      handleCancel: handleCancel,
    });
  };

  const handleAccept = async () => {
    setPopup({
      isVisible: false,
      onModalHide: async () => {
        await clearToken();
        dispatch(updateUser(null));
      },
    });
  };

  const handleCancel = () => {
    setPopup({ isVisible: false });
  };

  return (
    <ScrollView
      bounces
      style={styles.scroll}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {user?.avatar ? (
          <FastImage
            isPath
            source={{ uri: user?.avatar?.url }}
            style={styles.img}
          />
        ) : (
          <Image source={require('@images/avatar.png')} style={styles.img} />
        )}
        <View style={styles.vwInfo}>
          <Text bold style={styles.name}>
            {user?.name || ''}
          </Text>
          <Text style={styles.email}>{user?.email || ''}</Text>
        </View>
        <View style={styles.menu}>
          <ItemMenu
            label={'My Orders'}
            // count={orders?.length || 0}
            count={0}
            Icon={<SVG_My_Order />}
            onPress={() => handleNav(routes.OrderScreen)}
          />
          <ItemMenu
            label={'My Profile'}
            Icon={<SVG_Profile />}
            onPress={() => handleNav(routes.ProfileScreen)}
          />
          <ItemMenu
            Icon={<SVG_Delivery_Address />}
            label={'Delivery Address'}
            onPress={() => handleNav(routes.DeliveryAddressScreen)}
          />
          <ItemMenu Icon={<SVG_Payment />} label={'Payment Methods'} />
          <ItemMenu Icon={<SVG_Contact />} label={'Contact Us'} />
          <ItemMenu
            label={'Settings'}
            Icon={<SVG_Setting />}
            onPress={() => handleNav(routes.SettingScreen)}
          />
          <ItemMenu
            label={'Helps & FAQs'}
            Icon={<SVG_Helps />}
            onPress={() => handleNav(routes.HelpsAndFAQsScreen)}
          />
        </View>
        <Button style={styles.btnLogOut} onPress={handleConfirmLogOut}>
          <Image
            source={require('@images/log_out.png')}
            style={styles.imgLogOut}
          />
          <Text style={styles.txtLogOut}>{'Log Out'}</Text>
        </Button>
        <Popup {...popup} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginLeft: scale(20),
    marginTop: scale(50),
    paddingBottom: scale(30),
  },
  img: {
    width: wScale(90),
    height: wScale(90),
    borderRadius: scale(90),
  },
  vwInfo: {
    marginTop: scale(10),
  },
  name: {
    fontSize: fontSize.fontSize20,
  },
  email: {
    marginTop: scale(4),
    color: colors.gray_9796A1,
    fontSize: fontSize.fontSize12,
  },
  menu: {
    marginTop: scale(30),
  },
  btnLogOut: {
    width: wScale(120),
    height: hScale(44),
    borderRadius: scale(22),
    backgroundColor: colors.orange_FE724C,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imgLogOut: {
    width: wScale(26),
    height: wScale(26),
  },
  txtLogOut: {
    color: colors.white,
  },
});

export default Menu;
