import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Text} from '@components';
import {colors} from '@constant';
import {currencyUs} from '@utils';
import {scale} from '@resolutions';

const Item = ({label, value, bold}) => {
  return (
    <View style={styles.container}>
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
    marginBottom: scale(15),
    paddingBottom: scale(10),
    borderBottomWidth: scale(1),
    borderBottomColor: colors.gray_F2EAEA,
  },
  label: {},
  value: {
    textAlign: 'center',
    color: colors.orange_FE724C,
  },
});
