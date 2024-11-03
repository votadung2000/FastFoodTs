import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, fontSize, radius } from '@constants';
import { wScale, scale } from '@resolutions';
import { userSelector } from '@reducers';

import Button from './Button';
import Text from '../Text';
import FastImage from '../Image/FastImage';

interface BackFCProps {
  heart?: boolean;
  isFavorite?: boolean;
  title?: string;
  style?: StyleProp<ViewStyle>;
  stTitle?: StyleProp<TextStyle>;
  handleFavorite?: () => void;
  handleGoBack?: () => void;
}

const Back = ({
  heart,
  isFavorite,
  title,
  style,
  stTitle,
  handleFavorite,
  handleGoBack,
}: BackFCProps) => {
  const navigation = useNavigation();

  const user = useSelector(userSelector);

  const goBack = () => {
    if (handleGoBack) {
      handleGoBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Button onPress={() => goBack()} style={styles.btn}>
        <Ionicons name="chevron-back" size={scale(22)} color={colors.black} />
      </Button>
      {title && (
        <>
          <Text bold
            style={[
              styles.title,
              stTitle,
            ]}
          >
            {title}
          </Text>
          {user?.avatar ? (
            <FastImage
              isPath
              source={{uri: user?.avatar?.url}}
              style={styles.img}
            />
          ) : (
            <Image source={require('@images/avatar.png')} style={styles.img} />
          )}
        </>
      )}
      {heart && (
        <Button
          onPress={handleFavorite}
          style={[styles.vwFavorite, isFavorite && styles.vwIsFavorite]}
        >
          <View style={styles.vwIconFavorite}>
            <Ionicons name="heart" size={scale(20)} color={colors.white} />
          </View>
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999,
    marginTop: scale(15),
    paddingHorizontal: scale(25),
  },
  btn: {
    width: wScale(38),
    height: wScale(38),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    ...radius.shadow,
  },
  heart: {
    paddingLeft: scale(10),
  },
  title: {
    fontSize: fontSize.fontSize18,
  },
  img: {
    width: wScale(38),
    height: wScale(38),
    borderRadius: radius.radius10,
  },
  vwFavorite: {
    width: wScale(28),
    height: wScale(28),
    borderRadius: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  vwIsFavorite: {
    backgroundColor: colors.orange_FE724C,
  },
  vwIconFavorite: {
    width: scale(20),
    height: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Back;
