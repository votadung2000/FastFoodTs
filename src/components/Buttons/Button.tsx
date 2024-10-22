import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface ButtonFCProps extends TouchableOpacityProps {
  disabled?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>
}

const Button = ({ disabled, children, style, ...rest }: ButtonFCProps) => {
  return (
    <TouchableOpacity
      {...rest}
      {...{ disabled }}
      style={[style, disabled && styles.disabled]}
      activeOpacity={0.9}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
