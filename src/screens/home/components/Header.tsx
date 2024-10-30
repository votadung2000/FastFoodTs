import React from 'react';
import { View, StyleSheet, Image, Animated, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Text, Button, FastImage, Loading } from '@components';
import { colors, fontSize, radius } from '@constants';
import { scale, wScale } from '@resolutions';
import { animatedMenuSelector, deliveryAddressSelector, showMenu, userSelector } from '@reducers';
import { useAppDispatch } from '@store';

interface HeaderProps {
  titleHeaderAnimation?: ViewStyle,
}

const Header = ({ titleHeaderAnimation }: HeaderProps) => {
  const dispatch = useAppDispatch();

  const { triggerMenu } = useSelector(animatedMenuSelector);
  const { user } = useSelector(userSelector);
  const { currentAddress } = useSelector(deliveryAddressSelector);

  const goToUser = () => {
    dispatch(showMenu());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={goToUser} style={styles.btnMenu}>
          <AntDesign
            size={scale(20)}
            name={triggerMenu ? 'menu-unfold' : 'menu-fold'}
            color={colors.black}
          />
        </Button>
        <Button style={styles.btnAddress}>
          <View style={styles.vwIntro}>
            <Text medium style={styles.txtIntro}>
              {'Deliver to'}
            </Text>
            <Ionicons
              size={scale(22)}
              name="chevron-down"
              color={colors.black}
            />
          </View>
          {
            currentAddress.isLoadingCurrentAddress
              ? <Loading style={styles.loadingDeliveryAddress} />
              : (
                <Text medium style={styles.address}>
                  {currentAddress?.street_address || ''}
                </Text>
              )
          }
        </Button>
        {user?.avatar ? (
          <FastImage
            isPath
            source={{ uri: user?.avatar?.url }}
            style={styles.img}
          />
        ) : (
          <Image source={require('@images/avatar.png')} style={styles.img} />
        )}
      </View>
      <Animated.View style={[styles.vwTitle, titleHeaderAnimation]}>
        <Text bold style={styles.title}>
          {'What would you like\nto order'}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: scale(20),
    marginBottom: scale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnMenu: {
    width: wScale(38),
    height: wScale(38),
    borderRadius: radius.radius10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...radius.shadow,
  },
  btnAddress: {
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwIntro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtIntro: {
    marginRight: scale(4),
  },
  loadingDeliveryAddress: {
    marginTop: scale(4),
  },
  address: {
    textAlign: 'center',
    color: colors.orange_FE724C,
  },
  img: {
    width: wScale(38),
    height: wScale(38),
    borderRadius: radius.radius10,
  },
  vwTitle: {
    justifyContent: 'center',
    marginTop: scale(10),
  },
  title: {
    fontSize: fontSize.fontSize30,
    color: colors.black,
  },
});

export default Header;
