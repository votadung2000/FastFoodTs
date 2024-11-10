import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Text } from '@components';
import { colors } from '@constants';
import { currencyUs } from '@utils';

interface ItemProps {
  label?: string;
  value?: number;
  stContainer?: StyleProp<ViewStyle>;
}

const Item = ({ label, value, stContainer }: ItemProps) => {
  return (
    <View style={[styles.container, stContainer]}>
      <Text medium style={styles.label}>
        {label}
      </Text>
      <Text medium style={styles.value}>
        {currencyUs(value)}
      </Text>
    </View>
  );
};

export default React.memo(Item);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {},
  value: {
    textAlign: 'center',
    color: colors.orange_FE724C,
  },
});
