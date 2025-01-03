import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text, Button, FastImage } from '@components';
import { colors, fontSize, radius } from '@constants';
import { formatCurrency } from '@utils';
import { scale } from '@resolutions';
import { useAppDispatch } from '@store';
import { fetchApiDetailProducts, ProductData } from '@reducers';
import routes from '@routes';

const CardFavorite = ({ data }: { data: ProductData }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const handleProduct = () => {
    dispatch(fetchApiDetailProducts({ id: data?.id }));
    navigation.navigate(routes.ProductsDetailScreen);
  };

  const handlePlusCart = () => {
    // fetchCartProduct(item);
  };

  const handleRemoveHeart = () => {
    // addHeartProduct(item);
  };

  return (
    <Button onPress={() => handleProduct()} style={styles.container}>
      <FastImage isPath source={{ uri: data?.image?.url }} style={styles.img} />
      <View style={styles.content}>
        <Text bold numberOfLines={1} style={[styles.txtItem, styles.txtName]}>
          {data?.name}
        </Text>
        <Text style={[styles.txtItem, styles.txtTaste]}>{data?.taste}</Text>
        <Text bold style={styles.txtItem}>{`${formatCurrency(
          data?.price,
        )} Đ`}</Text>
      </View>
      <View style={styles.footer}>
        <Button onPress={() => handleRemoveHeart()} style={styles.plus}>
          <Ionicons name={'heart'} size={scale(26)} color={colors.heart} />
        </Button>
        <Button onPress={() => handlePlusCart()} style={styles.plus}>
          <AntDesign name="pluscircle" size={scale(26)} color={colors.orange} />
        </Button>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
    backgroundColor: colors.white,
    borderRadius: radius.radius14,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingVertical: scale(8),
    paddingHorizontal: scale(8),
  },
  img: {
    width: scale(70),
    height: scale(70),
  },
  txtItem: {
    textAlign: 'auto',
    fontSize: fontSize.fontSize14,
  },
  content: {
    width: '50%',
    paddingHorizontal: scale(5),
  },
  txtTaste: {
    fontSize: fontSize.fontSize12,
    color: colors.gray,
    marginBottom: scale(6),
  },
  txtName: {
    fontSize: fontSize.fontSize16,
    marginBottom: scale(6),
  },
  plus: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
    zIndex: 999,
  },
  footer: {
    alignItems: 'center',
  },
});

export default CardFavorite;
