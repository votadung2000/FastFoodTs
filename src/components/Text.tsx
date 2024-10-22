import React from 'react';

import { StyleSheet, Text as RNText, StyleProp, TextProps, TextStyle } from 'react-native';

import { colors, fontSize } from '@constants';

interface TextFCProps extends TextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  bold?: boolean;
  medium?: boolean;
}

const Text = ({ children, style, bold, medium, ...rest }: TextFCProps) => {
  return (
    <RNText
      style={[
        styles.regular,
        bold && styles.bold,
        medium && styles.medium,
        styles.text,
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.fontSize16,
    color: colors.black,
  },
  regular: {
    fontFamily: 'Inter-Regular',
  },
  bold: {
    fontFamily: 'Inter-Bold',
  },
  medium: {
    fontFamily: 'Inter-Medium',
  },
});

export default Text;
