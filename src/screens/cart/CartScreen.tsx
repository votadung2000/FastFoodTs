import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import {
  Text,
  Button,
  EmptyComponent,
  Notifer,
  ModalLoading,
} from '@components';

import { colors, fontSize } from '@constants';
import { hScale, scale } from '@resolutions';
import {
  CartData,
  cartSelector,
  clearCart,
  userSelector,
} from '@reducers';
import { useAppDispatch } from '@store';

import { CardCart, Item } from './components';

const { width } = Dimensions.get('window');

interface LoadingState {
  isVisible: boolean;
  onModalHide?: () => void;
}

const CartScreen = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector(userSelector);
  const { cart, subtotal, discount, total } = useSelector(cartSelector);

  const [loading, setLoading] = useState<LoadingState>({ isVisible: false });

  const handlePayment = async () => {
    setLoading({ isVisible: true });
    try {
      let body = {
        user_id: user?.id,
        total: total,
        products: cart?.map((ele: CartData) => ({
          id: ele?.id,
          name: ele?.name,
          quantity: ele?.order_quantity,
          price: ele?.price,
        })),
      };

      // let response = await fetchApiCreateOrder(body);
      // if (response.payload?.status_code === 200) {
      //   setLoading({
      //     isVisible: false,
      //     onModalHide: async () => {
      //       Notifer({
      //         alertType: 'success',
      //         title: 'Order Successfully!',
      //       });
      //       dispatch(clearCart());
      //     },
      //   });
      // }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  return (
    <View style={styles.layout}>
      <Text bold style={styles.title}>
        {'Cart'}
      </Text>
      {cart?.length === 0 ? (
        <EmptyComponent
          title="Cart's Empty"
          Icon={
            <Image
              source={require('@images/cart_empty.png')}
              style={styles.emptyImg}
            />
          }
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.body}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={styles.scroll}>
              {cart?.map((item: CartData, index: number) => {
                return <CardCart key={index?.toString()} data={item} />;
              })}
              {cart?.length ? (
                <View style={styles.vwCurrency}>
                  <Item label="Subtotal" value={subtotal} />
                  {false && <Item label="Tax and Fees" value={0} />}
                  {false && <Item label="Delivery" value={0} />}
                  <Item label="Discount" value={discount} />
                  <Item label="Total" value={total} />
                </View>
              ) : null}
            </ScrollView>
          </View>
          {cart?.length ? (
            <Button onPress={() => handlePayment()} style={styles.btnCheckout}>
              <Text bold style={styles.txtCheckout}>
                {'CHECKOUT'}
              </Text>
            </Button>
          ) : null}
        </View>
      )}
      <ModalLoading {...loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: hScale(72),
  },
  title: {
    fontSize: fontSize.fontSize30,
    alignSelf: 'flex-end',
    marginRight: scale(15),
    marginTop: scale(20),
  },
  emptyImg: {
    width: scale(120),
    height: scale(120),
    marginBottom: scale(8),
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scroll: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: scale(25),
    marginTop: scale(20),
  },
  vwCurrency: {
    marginTop: scale(20),
    paddingBottom: scale(30),
  },
  vwFooter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnCheckout: {
    width: width * 0.75,
    height: hScale(54),
    borderRadius: scale(26),
    marginTop: scale(20),
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FE724C,
  },
  txtCheckout: {
    fontSize: fontSize.fontSize18,
    color: colors.white,
  },
});

export default CartScreen;
