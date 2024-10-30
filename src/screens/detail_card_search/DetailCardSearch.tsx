import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { debounce } from 'lodash';

import { Search, Back } from '@components';

import { Products } from './components';
import { colors } from '@constants';
import { scale } from '@resolutions';
import { useSelector } from 'react-redux';
import {
  fetchApiListProducts,
  clearFilterPr,
  productSelector,
} from '@reducers';
import { useAppDispatch } from '@store';

const DetailCardSearch = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const { products } = useSelector(productSelector);
  const { filterPr } = products;

  const [txtSearch, setTxtSearch] = useState('');

  const handleGoBack = () => {
    dispatch(clearFilterPr());
    navigation.goBack();
  };

  const debouncedFetch = debounce((text) => {
    dispatch(fetchApiListProducts({ name: text }));
  }, 400);

  const handleFetchSearch = useCallback((text: string) => {
    debouncedFetch(text);
  }, [debouncedFetch]);

  const onChangeText = (text: string) => {
    setTxtSearch(text);
    handleFetchSearch(text);
  };

  return (
    <View style={styles.container}>
      <Back
        title={`Popular ${filterPr?.category_id?.name || ''}`}
        handleGoBack={handleGoBack}
      />
      <View style={styles.content}>
        <Search
          value={txtSearch}
          placeholder={'Search'}
          onChangeText={onChangeText}
        />
        <Products />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(25),
    marginTop: scale(20),
  },
});

export default DetailCardSearch;
