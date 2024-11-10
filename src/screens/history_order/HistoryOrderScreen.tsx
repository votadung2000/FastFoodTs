import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { EmptyComponent } from '@components';
import { SVG_Order_Empty } from '@svg';
import { useAppDispatch } from '@store';
import {
  fetchApiListOrder,
  OrderData,
  orderSelector,
} from '@reducers';
import { scale } from '@resolutions';

import Card from './Card';

const HistoryOrderScreen = () => {
  const dispatch = useAppDispatch();
  const { orders, relatedOrders } = useSelector(orderSelector);
  const { isLoadingOrders } = relatedOrders;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchApiListOrder({ is_history: true }));

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const keyExtractor = (_: any, index: number) => index.toString();

  const renderItem = ({ item }: { item: OrderData }) => {
    return <Card data={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.ccSt}
        ListEmptyComponent={
          isLoadingOrders
            ? null
            : (
              <EmptyComponent
                title="No history orders"
                Icon={<SVG_Order_Empty width={scale(120)} height={scale(120)} />}
                des={
                  'No order history have been placed yet.\nDiscover and order now.'
                }
              />
            )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(25),
  },
  ccSt: {
    flexGrow: 1,
    paddingBottom: scale(50),
    padding: scale(1),
  },
});

export default HistoryOrderScreen;
