import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigationState, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import { Text, Search } from '@components';
import {
  CategoryData,
  categorySelector,
  clearFilterPr,
  fetchApiListCategories,
  fetchApiListProducts,
  productSelector,
} from '@reducers';
import { useAppDispatch } from '@store';
import { colors, fontSize } from '@constants';
import { scale } from '@resolutions';
import { findBgLg } from '@utils';
import routes from '@routes';

import { Card, Products } from './components';

const SearchScreen = () => {
  const isFocused = useIsFocused();
  const indexRoute = useNavigationState(state => state?.index);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const dispatch = useAppDispatch();
  const { categories } = useSelector(categorySelector);
  const { relatedProducts } = useSelector(productSelector);
  const { filterPr } = relatedProducts;

  const [txtSearch, setTxtSearch] = useState('');

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchApiListCategories());

      return () => {
        dispatch(clearFilterPr());
        setTxtSearch('');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexRoute]);

  const onPressCard = (item: CategoryData) => {
    dispatch(fetchApiListProducts({ category: item }));
    navigation.navigate(routes.DetailCardSearch);
  };

  const debouncedFetch = debounce((text) => {
    dispatch(fetchApiListProducts({ name: text }));
  }, 600);

  const handleFetchSearch = useCallback((text: string) => {
    debouncedFetch(text);
  }, [debouncedFetch]);

  const onChangeText = (text: string) => {
    setTxtSearch(text);
    handleFetchSearch(text);
  };

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <Text bold style={styles.title}>
          {'Discover\nNew Flavors'}
        </Text>
        <Search
          value={txtSearch}
          placeholder={'Search'}
          onChangeText={onChangeText}
          style={styles.search}
        />
        {filterPr?.name ? (
          <Products />
        ) : (
          <ScrollView
            bounces={false}
            style={styles.scroll}
            showsVerticalScrollIndicator={false}>
            {categories?.data &&
              categories?.data?.map((item: CategoryData, index: number) => {
                return (
                  <Card
                    key={index?.toString()}
                    data={item}
                    bgLG={findBgLg(index)}
                    onPressCard={onPressCard}
                  />
                );
              })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flexGrow: 1,
    marginBottom: scale(72), // height nav bottom
  },
  title: {
    fontSize: fontSize.fontSize30,
    marginBottom: scale(15),
  },
  container: {
    flex: 1,
    marginHorizontal: scale(15),
    marginTop: scale(20),
  },
  search: {
    marginBottom: scale(20),
  },
});

export default SearchScreen;
