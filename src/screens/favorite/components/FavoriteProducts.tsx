import React from 'react';
import { StyleSheet, View, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { Text } from '@components';
import { colors, fontSize } from '@constants';
import { hScale, scale } from '@resolutions';
import {
  FavoriteData,
  favoriteSelector,
  loadMoreListFavorites,
} from '@reducers';
import { useAppDispatch } from '@store';

import CardFavorite from './CardFavorite';

const EmptyFavorite = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image source={require('@images/favorites_empty.png')} style={styles.emptyImg} />
      <Text bold style={styles.txtEmpty}>
        {"Favorite's Empty"}
      </Text>
    </View>
  );
};

const FavoriteProducts = () => {
  const dispatch = useAppDispatch();
  const { favorites, relatedFavorites } = useSelector(favoriteSelector);
  const { isLoadingFavorites, isFetchingFavorites, filterFavorites } = relatedFavorites;

  const keyExtractor = (_: any, index: number) => index.toString();

  const renderItem = ({ item }: { item: FavoriteData }) => {
    return <CardFavorite data={item?.product} />;
  };

  const onEndReached = () => {
    if (!isFetchingFavorites && favorites?.total > favorites?.data?.length) {
      dispatch(loadMoreListFavorites());
    }
  };

  return (
    <View style={styles.container}>
      <Text bold style={styles.title}>
        {filterFavorites?.category?.name || 'All'}
      </Text>
      <FlatList
        data={favorites?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onEndReached}
        bounces={false}
        contentContainerStyle={styles.containerStyle}
        scrollIndicatorInsets={{ right: 1 }}
        ListEmptyComponent={
          isLoadingFavorites
            ? null
            : <EmptyFavorite />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.fontSize15,
    marginTop: scale(5),
    marginBottom: scale(10),
    marginLeft: scale(10),
  },
  containerStyle: {
    flexGrow: 1,
    paddingHorizontal: scale(10),
    paddingVertical: scale(1),
    marginTop: scale(5),
    paddingBottom: hScale(72),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImg: {
    width: scale(150),
    height: scale(150),
    marginBottom: scale(8),
  },
  txtEmpty: {
    color: colors.graySystem2,
    fontSize: fontSize.fontSize18,
  },
});

export default FavoriteProducts;
