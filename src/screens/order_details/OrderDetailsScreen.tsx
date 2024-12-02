import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import {
  Back,
  Button,
  Text,
  Popup,
  Notifer,
  ModalLoading,
  PopupProps,
} from '@components';
import {
  STATUS_ORDER,
  checkStatusFinishOrder,
  checkStatusWaitingOrder,
  colors,
  radius,
} from '@constants';
import { hScale, scale } from '@resolutions';
import { useAppDispatch } from '@store';
import {
  fetchApiListOrder,
  fetchApiUpdateOrder,
  fetchRating,
  orderSelector,
} from '@reducers';
import routes from '@routes';

import Header from './Header';
import InfoStore from './InfoStore';
import OrdersFood from './OrdersFood';
import Item from './Item';

interface PopupState extends PopupProps {
  isVisible: boolean;
  onModalHide?: () => void;
}

interface LoadingState {
  isVisible: boolean;
  onModalHide?: () => void;
}

const OrderDetailsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const { order } = useSelector(orderSelector);

  const [loading, setLoading] = useState<LoadingState>({ isVisible: false });
  const [popup, setPopup] = useState<PopupState>({ isVisible: false });

  const handleRating = () => {
    dispatch(fetchRating(order));
    navigation.navigate(routes.RatingScreen);
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
        id: order?.id,
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
            navigation.goBack();
          },
        });
      }else{
        setLoading({ isVisible: false });
      }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  return (
    <View style={styles.container}>
      <Back title={'Order Details'} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}>
        <View style={styles.content}>
          <Header data={order} />
          <InfoStore />
          <OrdersFood data={order} />
          <Item
            label="Total"
            value={order?.total}
            stContainer={styles.stContainerItem}
          />
        </View>
        {checkStatusFinishOrder(order?.status) ? (
          <View style={styles.vwFooter}>
            <Button
              style={[styles.btnAction, styles.btnRate]}
              onPress={handleRating}>
              <Text medium style={styles.txtRate}>
                {'Rate'}
              </Text>
            </Button>
            <Button style={[styles.btnAction, styles.btnReOrder]}>
              <Text medium style={styles.txtReOrder}>
                {'Re-Order'}
              </Text>
            </Button>
          </View>
        ) : (
          <View
            style={[
              styles.vwFooter,
              !checkStatusWaitingOrder(order?.status) && styles.anoFooter,
            ]}>
            {checkStatusWaitingOrder(order?.status) && (
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
        )}
      </ScrollView>
      <ModalLoading {...loading} />
      <Popup {...popup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: scale(20),
    paddingHorizontal: scale(25),
  },
  stContainerItem: {
    marginTop: scale(20),
  },
  vwFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(50),
    paddingHorizontal: scale(25),
    paddingBottom: hScale(50),
  },
  anoFooter: {
    justifyContent: 'flex-end',
  },
  btnAction: {
    width: '48%',
    height: hScale(54),
    borderRadius: scale(27),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRate: {
    borderWidth: scale(1),
    borderColor: colors.orange_FE724C,
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  txtRate: {
    color: colors.orange_FE724C,
  },
  btnReOrder: {
    backgroundColor: colors.orange_FE724C,
    ...radius.shadow,
  },
  txtReOrder: {
    color: colors.white,
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

export default OrderDetailsScreen;
