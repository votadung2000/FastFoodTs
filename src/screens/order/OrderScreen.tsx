import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Back } from '@components';
import { TAB_ORDER, colors } from '@constants';
import { initTab, orderSelector } from '@reducers';
import { useAppDispatch } from '@store';
import { scale } from '@resolutions';

import TopTabs from './TopTabs';
import UpcomingOrderScreen from '../upcoming_order';
import HistoryOrderScreen from '../history_order';

const OrderScreen = () => {
  const dispatch = useAppDispatch();
  const { tab } = useSelector(orderSelector);

  useEffect(() => {
    return () => {
      dispatch(initTab());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Back title={'My Order'} />
      <TopTabs />
      <View style={styles.content}>
        {TAB_ORDER.UPCOMING.id === tab?.id ? (
          <UpcomingOrderScreen />
        ) : (
          <HistoryOrderScreen />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    marginTop: scale(20),
  },
});

export default OrderScreen;
