import React from 'react';
import { StyleSheet, View, TextInput, ViewStyle, StyleProp } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, fontSize, radius } from '@constants';
import { hScale, scale } from '@resolutions';

interface SearchProps {
  value?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void
}

const Search = ({ value, placeholder, style, onChangeText }: SearchProps) => {
  const handleChangeText = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name="search"
        size={scale(22)}
        color={colors.graySystem}
        style={styles.icon}
      />
      <TextInput
        value={value}
        placeholder={placeholder}
        autoCapitalize="none"
        style={styles.inputSearch}
        onChangeText={text => handleChangeText(text)}
        placeholderTextColor={colors.graySystem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: radius.radius10,
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  icon: {
    position: 'absolute',
    left: scale(10),
    zIndex: 9999,
  },
  inputSearch: {
    color: colors.black,
    fontSize: fontSize.fontSize16,
    height: hScale(48),
    width: '100%',
    paddingLeft: scale(40),
    fontFamily: 'Inter-Regular',
  },
});

export default React.memo(Search);
