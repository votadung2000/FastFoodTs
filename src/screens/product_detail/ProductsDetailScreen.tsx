import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import {
  Text,
  Back,
  Button,
  FastImage,
  Notifer,
  ModalLoading,
  LoadingComponent,
} from '@components';
import { formatCurrency } from '@utils';
import { colors, fontSize, radius } from '@constants';
import { hScale, scale, wScale } from '@resolutions';
import {
  addToCart,
  fetchApiCDFavorite,
  fetchApiDetailProducts,
  productSelector,
  userSelector,
} from '@reducers';
import { useAppDispatch } from '@store';

const { height } = Dimensions.get('window');

interface LoadingState {
  isVisible: boolean;
  onModalHide?: () => void;
}

const ProductsDetailScreen = () => {
  const dispatch = useAppDispatch();

  const { product } = useSelector(productSelector);
  const { user } = useSelector(userSelector);

  const [loading, setLoading] = useState<LoadingState>({ isVisible: false });

  const handleFavorite = async () => {
    setLoading({ isVisible: true });
    try {
      let body = {
        user_id: user?.id,
        product_id: product?.id,
      };

      let response = await dispatch(fetchApiCDFavorite(body));
      if (response.payload?.status_code === 200) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            Notifer({
              alertType: 'success',
              title: product.is_favorite
                ? 'Delete Favorites Successfully!'
                : 'Create Favorites Successfully!',
            });
            await dispatch(fetchApiDetailProducts({ id: product?.id }));
          },
        });
      }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  const handlePlusCart = () => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return (
      <View style={styles.layout}>
        <Back heart />
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={styles.layout}>
      <ScrollView
        bounces={false}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{ right: 1 }}>
        <View style={styles.container}>
          <Back
            heart
            isFavorite={product?.is_favorite}
            handleFavorite={handleFavorite}
          />
          <View style={styles.header}>
            <FastImage
              isPath
              source={{ uri: product?.image?.url }}
              style={styles.img}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.headerContent}>
              <Text bold style={styles.txtTitle}>
                {product?.name || ''}
              </Text>
              <Text bold style={[styles.txtTitle, styles.price]}>
                {`${formatCurrency(product?.price)} Đ`}
              </Text>
            </View>
            <Text style={styles.txtContent}>{product?.taste || ''}</Text>
            <Text style={styles.txtContent}>{product?.description || ''}</Text>
          </View>
        </View>
      </ScrollView>
      <Button onPress={handlePlusCart} style={styles.plus}>
        <View style={styles.vwImg}>
          <Image source={require('@images/cart.png')} style={styles.imgCart} />
        </View>
        <Text style={styles.txtAdd}>{'ADD TO CART'}</Text>
      </Button>
      <ModalLoading {...loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: scale(300),
    width: scale(300),
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  txtTitle: {
    fontSize: fontSize.fontSize20,
  },
  price: {
    color: colors.price,
    fontSize: fontSize.fontSize18,
  },
  txtContent: {
    color: colors.gray,
    fontSize: fontSize.fontSize16,
    textAlign: 'left',
    marginBottom: scale(10),
  },
  plus: {
    position: 'absolute',
    right: scale(20),
    bottom: scale(20),
    width: wScale(170),
    height: hScale(52),
    borderRadius: scale(26),
    backgroundColor: colors.orange_FE724C,
    flexDirection: 'row',
    alignItems: 'center',
    ...radius.shadow,
  },
  vwImg: {
    width: wScale(40),
    height: wScale(40),
    borderRadius: radius.radius20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(6),
  },
  imgCart: {
    width: wScale(18),
    height: wScale(18),
  },
  txtAdd: {
    marginLeft: scale(10),
    color: colors.white,
  },
});

export default ProductsDetailScreen;
