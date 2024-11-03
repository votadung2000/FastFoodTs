import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { EmptyComponent, LoadingComponent } from '@components';
import {
  loadMoreListProducts,
  productSelector,
  ProductData,
} from '@reducers';
import { useAppDispatch } from '@store';
import { handleDataOdd } from '@utils';
import { scale } from '@resolutions';

import CardProducts from './CardProducts';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, relatedProducts } = useSelector(productSelector);
  const { isLoadingProducts, isFetchingProducts, filterPr } = relatedProducts;

  const keyExtractor = (_: any, index: number) => index.toString();

  const renderItem = ({ item }: { item: ProductData }) => {
    return item && Object.keys(item).length > 0 ? (
      <CardProducts data={item} />
    ) : null;
  };

  const onEndReached = () => {
    if (!isFetchingProducts && products?.total > products?.data?.length) {
      dispatch(loadMoreListProducts());
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={handleDataOdd(products?.data)}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onEndReached}
        bounces={false}
        contentContainerStyle={styles.ccSt}
        columnWrapperStyle={styles.wrapperStyle}
        scrollIndicatorInsets={{ right: 1 }}
        ListHeaderComponent={isLoadingProducts && <LoadingComponent />}
        ListFooterComponent={isFetchingProducts && <LoadingComponent />}
        ListEmptyComponent={
          isLoadingProducts
            ? null
            : (
              <EmptyComponent
                title="Product's Empty"
                source={{ uri: filterPr?.category?.image?.url }}
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
  },
  ccSt: {
    flexGrow: 1,
    paddingBottom: scale(100),
  },
  wrapperStyle: {
    justifyContent: 'space-around',
  },
});

export default Products;
