
import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Location } from '@components';
import { colors, radius } from '@constants';
import {
  animatedMenuSelector,
  fetchApiCurrentAddress,
  fetchApiListCategories,
} from '@reducers';
import { useAppDispatch } from '@store';
import { hScale, scale } from '@resolutions';

import { Products, Menu, Header } from './components';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const { triggerMenu } = useSelector(animatedMenuSelector);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchApiListCategories());
      dispatch(fetchApiCurrentAddress());

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const titleHeaderAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    height: animatedValue.interpolate({
      inputRange: [0, hScale(80)],
      outputRange: [hScale(80), 0],
      extrapolate: 'clamp',
    }),
    marginTop: animatedValue.interpolate({
      inputRange: [0, scale(28)],
      outputRange: [scale(28), 0],
      extrapolate: 'clamp',
    }),
  };

  return (
    <View style={[styles.layout, triggerMenu && styles.stBorderRadius]}>
      <View style={styles.container}>
        <Header titleHeaderAnimation={titleHeaderAnimation} />
        <Menu />
        <Products animatedValue={animatedValue} />
      </View>
      <Location />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  stBorderRadius: {
    borderRadius: radius.radius14,
  },
});

export default HomeScreen;
