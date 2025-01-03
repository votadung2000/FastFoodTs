import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFastImage from 'react-native-fast-image';

import { Text, Button, FastImage } from '@components';
import { colors, fontSize, radius } from '@constants';
import { formatCurrency } from '@utils';
import { hScale, wScale, scale } from '@resolutions';
import {
  addToCart,
  CategoryData,
  fetchApiDetailProducts,
  ProductData,
} from '@reducers';
import { useAppDispatch } from '@store';
import routes from '@routes';

const CardProducts = ({ data }: { data: CategoryData }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const handleProduct = (item: ProductData) => {
    dispatch(fetchApiDetailProducts({ id: item?.id }));
    navigation.navigate(routes.ProductsDetailScreen);
  };

  const handlePlusCart = (item: ProductData) => {
    dispatch(addToCart(item));
  };

  const keyExtractor = (_: any, index: number) => index.toString();

  const renderItem = ({ item }: { item: ProductData }) => {
    return (
      <Button style={styles.card} onPress={() => handleProduct(item)}>
        <FastImage
          isPath
          style={styles.img}
          source={{ uri: item?.image?.url }}
          resizeMode={RNFastImage.resizeMode.stretch}
        />
        <View style={styles.content}>
          <Text bold style={styles.name}>
            {item?.name}
          </Text>
          <Text style={styles.txtTaste}>{item?.taste || ''}</Text>
        </View>
        <View style={styles.footer}>
          <Text bold style={styles.price}>
            {`${formatCurrency(item?.price)} Đ`}
          </Text>
          <Button style={styles.plus} onPress={() => handlePlusCart(item)}>
            <AntDesign name="plus" size={scale(18)} color={colors.white} />
          </Button>
        </View>
        <View
          style={[styles.vwFavorite, item?.is_favorite && styles.vwIsFavorite]}>
          <View style={styles.vwIconFavorite}>
            <Ionicons name="heart" size={scale(20)} color={colors.white} />
          </View>
        </View>
      </Button>
    );
  };

  return (
    <FlatList
      horizontal
      data={data?.products}
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      bounces={false}
      contentContainerStyle={styles.ccSt}
    />
  );
};

const styles = StyleSheet.create({
  ccSt: {
    padding: scale(1),
  },
  card: {
    marginRight: scale(15),
    backgroundColor: colors.white,
    borderRadius: radius.radius14,
    ...radius.shadow,
  },
  img: {
    width: wScale(266),
    height: hScale(136),
    backgroundColor: colors.white,
    borderRadius: radius.radius14,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(15),
    marginTop: scale(15),
  },
  name: {
    fontSize: fontSize.fontSize16,
  },
  txtTaste: {
    marginTop: scale(6),
    fontSize: fontSize.fontSize12,
    color: colors.gray,
  },
  footer: {
    marginTop: scale(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    flex: 1,
    marginLeft: scale(15),
    textAlign: 'auto',
    fontSize: fontSize.fontSize20,
  },
  plus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderBottomEndRadius: radius.radius14,
    borderTopStartRadius: radius.radius14,
    paddingVertical: scale(10),
    backgroundColor: colors.orange_FE724C,
  },
  vwFavorite: {
    position: 'absolute',
    top: scale(15),
    right: scale(15),
    width: wScale(28),
    height: wScale(28),
    borderRadius: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  vwIsFavorite: {
    backgroundColor: colors.orange_FE724C,
  },
  vwIconFavorite: {
    width: scale(20),
    height: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardProducts;
