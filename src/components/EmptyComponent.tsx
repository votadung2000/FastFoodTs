import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Source } from 'react-native-fast-image';

import { colors, fontSize } from '@constants';
import { scale } from '@resolutions';

import FastImage from './Image/FastImage';
import Text from './Text';

interface EmptyComponentProps {
  source?: Source;
  title?: string;
  des?: string;
  Icon?: JSX.Element;
}

const EmptyComponent = ({ source, title, des, Icon }: EmptyComponentProps) => {
  return (
    <View style={styles.emptyContainer}>
      {Icon && Icon}
      {source && <FastImage isPath source={{ uri: source?.uri }} style={styles.emptyImg} />}
      <Text bold style={styles.txtEmpty}>
        {title || "Product's Empty"}
      </Text>
      {des && <Text style={styles.txtDes}>{des}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(8),
  },
  emptyImg: {
    width: scale(150),
    height: scale(150),
  },
  txtEmpty: {
    fontSize: fontSize.fontSize18,
    marginTop: scale(12),
  },
  txtDes: {
    color: colors.gray_9796A1,
    fontSize: fontSize.fontSize14,
    marginTop: scale(12),
    textAlign: 'center',
  },
});

export default EmptyComponent;
