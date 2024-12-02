import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';

import { Text, Button, PopupMenu } from '@components';
import { scale, wScale } from '@resolutions';
import {
  DEFAULT_DELIVERY_ADDRESS,
  checkDefaultDeliveryAddress,
  findTypeDeliveryAddress,
  colors,
  fontSize,
  radius,
  DATA_POPUP_MENU,
  TypeDeliveryAddressProps,
} from '@constants';
import { formatNaturalNumber } from '@utils';
import { DeliveryAddressData, fetchApiDetailAddress } from '@reducers';
import { useAppDispatch } from '@store';
import routes from '@routes';

const Card = ({ data }: { data: DeliveryAddressData }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const handleDetail = () => {
    dispatch(fetchApiDetailAddress({ id: data?.id }));
    navigation.navigate(routes.DetailDeliveryAddressScreen);
  };

  const resultType: TypeDeliveryAddressProps = data?.type
    && findTypeDeliveryAddress(data?.type) || {
    name: '',
    Icon: () => null,
    iconProps: {},
  };

  return (
    <Button style={styles.container} onPress={handleDetail}>
      <View style={styles.vwIcon}>
        <View style={styles.vwBgIcon}>
          <resultType.Icon {...resultType.iconProps} />
        </View>
      </View>
      <View style={styles.vwContent}>
        <Text bold>{`${resultType?.name || ''}`}</Text>
        <Text medium style={styles.txtGlobal}>
          {`${data?.id ? formatNaturalNumber(data?.id) : ''}-${moment(
            data?.created_at
              ? new Date(data?.created_at)
              : ''
          ).format('DD-MM-YY')}`}
        </Text>
        <Text medium style={styles.txtGlobal}>
          {`${data?.street_address || ''}`}
        </Text>
        {data?.default && checkDefaultDeliveryAddress(data?.default) && (
          <View style={styles.vwType}>
            <Text style={styles.txtType}>
              {DEFAULT_DELIVERY_ADDRESS.DEFAULT.name}
            </Text>
          </View>
        )}
        <View style={styles.vwMenu}>
          <PopupMenu
            dataMenu={DATA_POPUP_MENU}
            data={{
              id: data?.id,
            }}
          />
        </View>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: scale(20),
    padding: scale(15),
    backgroundColor: colors.white,
    borderRadius: radius.radius10,
    ...radius.shadow,
  },
  vwIcon: {
    width: wScale(65),
    height: wScale(65),
    padding: scale(1),
    borderRadius: radius.radius10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  vwBgIcon: {
    width: wScale(45),
    height: wScale(45),
    borderRadius: scale(45),
    backgroundColor: colors.orange_FE724C,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    width: '100%',
    height: '100%',
    borderRadius: radius.radius10,
  },
  vwContent: {
    flexGrow: 1,
    marginLeft: scale(18),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txtGlobal: {
    marginTop: scale(8),
    fontSize: fontSize.fontSize12,
    color: colors.gray_9796A1,
  },
  vwType: {
    marginTop: scale(8),
    borderWidth: scale(1),
    borderColor: colors.orange_FE724C,
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: radius.radius4,
  },
  txtType: {
    fontSize: fontSize.fontSize12,
    color: colors.orange_FE724C,
  },
  vwMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
});

export default Card;
