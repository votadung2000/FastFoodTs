import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { colors } from '@constants';

interface LoadingProps {
  color?: string;
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>
}

const Loading = ({ color, size, style }: LoadingProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        size={size || 'small'}
        color={color || colors.orange_FE724C}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default Loading;
