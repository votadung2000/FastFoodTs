import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigationState, useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Text } from '@components';
import { colors, fontSize } from '@constants';
import { scale } from '@resolutions';
import { useAppDispatch } from '@store';
import {
  clearFilterFavorites,
  fetchApiListCategories,
  fetchApiListFavorites,
  userSelector,
} from '@reducers';

import { Menu, FavoriteProducts } from './components';

const FavoriteScreen = () => {
  const isFocused = useIsFocused();
  const indexRoute = useNavigationState(state => state?.index);

  const dispatch = useAppDispatch();
  const { user } = useSelector(userSelector);

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchApiListCategories());
      dispatch(fetchApiListFavorites({ user }));

      return () => {
        dispatch(clearFilterFavorites());
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexRoute]);

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
