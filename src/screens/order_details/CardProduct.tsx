import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNFastImage from 'react-native-fast-image';

import { Text, FastImage } from '@components';
import { colors, fontSize, radius } from '@constants';
import { currencyUs } from '@utils';
import { scale, wScale } from '@resolutions';
import { OrderItem } from '@reducers';

const CardProduct = ({ data }: { data: OrderItem }) => {
  return (
    <View style={styles.container}>
      <FastImage
        isPath
        source={{ uri: data?.product?.image?.url }}
        style={styles.img}
        resizeMode={RNFastImage.resizeMode.stretch}
      />
      <View style={styles.bodyItem}>
        <View style={styles.headerItem}>
          <View>
            <Text bold style={styles.name}>
              {data?.product?.name || ''}
            </Text>
            <Text style={styles.taste}>{data?.product?.taste || ''}</Text>
          </View>
        </View>
        <View style={styles.headerItem}>
          <Text medium style={styles.priceItem}>
            {`${currencyUs(data?.price)} `}
          </Text>
        </View>
      </View>
      <Text medium style={styles.txQuantity}>
        {`x${data?.quantity || ''}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
    marginTop: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),
    backgroundColor: colors.white,
    borderRadius: radius.radius14,
    ...radius.shadow,
  },
  vwImg: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  img: {
    width: wScale(82),
    height: wScale(82),
    borderRadius: radius.radius14,
  },
  bodyItem: {
    flexGrow: 1,
    marginLeft: scale(20),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: fontSize.fontSize18,
  },
  taste: {
    marginTop: scale(4),
    fontSize: fontSize.fontSize12,
    color: colors.gray_9796A1,
  },
  priceItem: {
    textAlign: 'center',
    color: colors.orange_FE724C,
  },
  txQuantity: {
    fontSize: fontSize.fontSize18,
    alignSelf: 'center',
    marginRight: scale(8),
  },
});

export default CardProduct;
