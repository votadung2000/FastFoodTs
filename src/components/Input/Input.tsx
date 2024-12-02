import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { colors, fontSize, radius } from '@constants';
import { hScale, scale } from '@resolutions';

import Text from '../Text';

interface InputFCProps extends TextInputProps {
  medium?: boolean;
  isTouchStart?: boolean;
  label?: string;
  name: string;
  touched?: any;
  errors?: any;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  onChangeText?: any;
  handleChange?: any;
  handleBlur?: any;
  onSubmitEditing?: () => void;
  Icon?: JSX.Element | null;
}

const Input = (
  {
    medium,
    isTouchStart,
    label,
    name,
    touched,
    errors,
    style,
    inputStyle,
    onChangeText,
    handleChange,
    handleBlur,
    Icon,
    ...rest
  }: InputFCProps,
  ref: React.ForwardedRef<TextInput>,
) => {
  const [isInput, setInput] = useState(false);

  const handleInputStart = () => {
    if (!isTouchStart) {
      setInput(true);
    }
  };

  const onBlur = () => {
    setInput(false);
  };

  return (
    <View {...style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.content}>
        <TextInput
          ref={ref}
          autoCapitalize="none"
          placeholderTextColor={colors.gray_C4C4C4}
          style={[
            styles.input,
            medium && styles.medium,
            isInput && styles.inputting,
            inputStyle,
          ]}
          onChangeText={
            onChangeText ? text => onChangeText(text) : handleChange(name)
          }
          onBlur={onBlur}
          onEndEditing={handleBlur(name)}
          onTouchStart={handleInputStart}
          {...rest}
        />
        {Icon && Icon}
      </View>
      {touched?.[name] && errors?.[name] ? (
        <Text style={styles.error}>{errors?.[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: hScale(64),
    color: colors.black,
    fontSize: fontSize.fontSize16,
    borderColor: colors.gray_EEEEEE,
    borderWidth: 1,
    borderRadius: radius.radius10,
    padding: 0,
    paddingLeft: scale(20),
    paddingRight: scale(10),
    fontFamily: 'Inter-Regular',
  },
  inputting: {
    borderColor: colors.orange_FE724C,
  },
  medium: {
    fontFamily: 'Inter-Medium',
  },
  label: {
    marginBottom: scale(10),
    color: colors.gray_9796A1,
  },
  error: {
    color: colors.redSystem,
    fontSize: fontSize.fontSize11,
    marginTop: scale(5),
  },
});

export default React.forwardRef(Input);
