import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import {useFocusEffect } from '@react-navigation/native';

import { Text } from '@components';
import { colors, fontSize } from '@constants';
import { scale } from '@resolutions';
import { useAppDispatch } from '@store';
import {
  clearFilterFavorites,
  fetchApiListCategories,
  fetchApiListFavorites,
} from '@reducers';

import { Menu, FavoriteProducts } from './components';

const FavoriteScreen = () => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchApiListCategories());
      dispatch(fetchApiListFavorites({}));

      return () => {
        dispatch(clearFilterFavorites());
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {'Favorite'}
      </Text>
      <View style={styles.body}>
        <Menu />
        <FavoriteProducts />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSize.fontSize30,
    alignSelf: 'flex-end',
    marginRight: scale(15),
    marginTop: scale(20),
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default FavoriteScreen;
