import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius } from '@constants';
import { hScale, scale } from '@resolutions';
import { Text } from '@components';

interface ItemCardProps {
  label?: string;
  value?: string;
  style?: StyleProp<ViewStyle>;
}

const ItemCard = ({ label, value, style }: ItemCardProps) => {
  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.vwValue}>
        <Text medium style={styles.txtValue}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: scale(10),
    color: colors.gray_9796A1,
  },
  vwValue: {
    height: hScale(65),
    borderColor: colors.gray_EEEEEE,
    borderWidth: 1,
    borderRadius: radius.radius10,
    padding: 0,
    paddingLeft: scale(20),
    paddingRight: scale(10),
    justifyContent: 'center',
  },
  txtValue: {
    color: colors.black,
  },
});

export default ItemCard;
