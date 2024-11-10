import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@components';
import { scale } from '@resolutions';
import { fontSize } from '@constants';
import { OrderData } from '@reducers';

import CardProduct from './CardProduct';

const OrdersFood = ({ data }: { data: OrderData }) => {
  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {'Orders food'}
      </Text>
      {data?.order_item?.map((item, index) => {
        return <CardProduct key={index?.toString()} data={item} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
  },
  title: {
    fontSize: fontSize.fontSize18,
  },
});

export default OrdersFood;
