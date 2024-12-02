import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DeviceInfo from 'react-native-device-info';

import { Button, Text, Popup, Notifer, ModalLoading, PopupProps } from '@components';
import {
  STATUS_ORDER,
  checkStatusWaitingOrder,
  colors,
  findStatusOrder,
  fontSize,
  radius,
} from '@constants';
import { hScale, scale, wScale } from '@resolutions';
import { fetchApiDetailOrder, fetchApiListOrder, fetchApiUpdateOrder, OrderData } from '@reducers';
import routes from '@routes';
import { useAppDispatch } from '@store';

let appName = DeviceInfo.getApplicationName();

interface PopupState extends PopupProps {
  isVisible: boolean;
  onModalHide?: () => void;
}

interface LoadingState {
  isVisible: boolean;
  onModalHide?: () => void;
}

const Card = ({ data }: { data: OrderData }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<LoadingState>({ isVisible: false });
  const [popup, setPopup] = useState<PopupState>({ isVisible: false });

  const handleCard = () => {
    dispatch(fetchApiDetailOrder({ id: data?.id }));
    navigation.navigate(routes.OrderDetailsScreen);
  };

  const handleConfirm = () => {
    setPopup({
      isVisible: true,
      title: 'Attention',
      content: 'Do you want to cancel the order?',
      cancel: 'Cancel',
      handleCancel: () => {
        setPopup({ isVisible: false });
      },
      accept: 'Confirm',
      handleAccept: handleAccept,
    });
  };

  const handleAccept = async () => {
    setPopup({
      isVisible: false,
      onModalHide: () => {
        handleCancelOrder();
      },
    });
  };

  const handleCancelOrder = async () => {
    setLoading({ isVisible: true });
    try {
      let body = {
        id: data?.id,
        status: STATUS_ORDER.CANCELED.status,
      };

      let response = await dispatch(fetchApiUpdateOrder(body));
      if (response.payload?.status_code === 200) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            Notifer({
              alertType: 'success',
              title: 'Order Canceled Successfully!',
            });
            await dispatch(fetchApiListOrder({ is_upcoming: true }));
          },
        });
      } else {
        setLoading({ isVisible: false });
      }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  return (
    <Button style={styles.container} onPress={handleCard}>
      <View style={styles.vwHeader}>
        <View style={styles.vwHeaderLeft}>
          <View style={styles.vwLogo}>
            <Image
              source={require('@images/logo.png')}
              style={styles.imgLogo}
            />
          </View>
          <View style={styles.vwContentHeader}>
            <Text medium style={styles.txtItem}>
              {`${data?.order_item?.length || 0} items`}
            </Text>
            <Text bold style={styles.txtBrand}>
              {`${appName}`}
            </Text>
          </View>
        </View>
        <Text style={styles.txtId}>{`#${data?.id || ''}`}</Text>
      </View>
      <View style={styles.vwBody}>
        <View style={styles.vwBodyTime}>
          <Text medium style={styles.txtLabelBody}>
            {'Estimated Arrival'}
          </Text>
          <Text medium style={styles.txtTime}>
            <Text medium style={styles.txtTimeArrive}>
              {25}
            </Text>
            {' min'}
          </Text>
        </View>
        <View style={styles.vwBodyStatus}>
          <Text medium style={styles.txtLabelBody}>
            {'Now'}
          </Text>
          <Text
            medium
            style={[
              styles.txtStatus,
              {
                color: findStatusOrder(data?.status)?.color,
              },
            ]}>
            {findStatusOrder(data?.status)?.name || ''}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.vwFooter,
          !checkStatusWaitingOrder(data?.status) && styles.anoFooter,
        ]}>
        {checkStatusWaitingOrder(data?.status) && (
          <Button
            style={[styles.btnAction, styles.btnCancel]}
            onPress={handleConfirm}>
            <Text medium>{'Cancel'}</Text>
          </Button>
        )}
        <Button style={[styles.btnAction, styles.btnTrackOrder]}>
          <Text medium style={styles.txtTrackOrder}>
            {'Track Order'}
          </Text>
        </Button>
      </View>
      <ModalLoading {...loading} />
      <Popup {...popup} />
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: scale(20),
    padding: scale(15),
    borderRadius: radius.radius10,
    ...radius.shadow,
  },
  vwHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vwLogo: {
    width: wScale(65),
    height: wScale(65),
    padding: scale(1),
    backgroundColor: colors.white,
    borderRadius: radius.radius10,
    ...radius.shadow,
  },
  vwHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgLogo: {
    width: '100%',
    height: '100%',
    borderRadius: radius.radius10,
  },
  vwContentHeader: {
    marginLeft: scale(18),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txtItem: {
    fontSize: fontSize.fontSize12,
    color: colors.gray_9796A1,
  },
  txtBrand: {
    marginTop: scale(10),
  },
  txtId: {
    color: colors.orange_FE724C,
  },
  vwBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: scale(15),
  },
  vwBodyTime: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txtLabelBody: {
    fontSize: fontSize.fontSize12,
    color: colors.gray_9796A1,
  },
  txtTime: {
    marginTop: scale(8),
  },
  txtTimeArrive: {
    fontSize: fontSize.fontSize40,
  },
  vwBodyStatus: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  txtStatus: {
    marginTop: scale(8),
  },
  vwFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(15),
  },
  anoFooter: {
    justifyContent: 'flex-end',
  },
  btnAction: {
    width: '48%',
    height: hScale(44),
    borderRadius: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCancel: {
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  btnTrackOrder: {
    backgroundColor: colors.orange_FE724C,
    ...radius.shadow,
  },
  txtTrackOrder: {
    color: colors.white,
  },
});

export default Card;
