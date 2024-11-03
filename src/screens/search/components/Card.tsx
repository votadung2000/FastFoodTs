import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors, fontSize, radius } from '@constants';
import { Text, Button, FastImage } from '@components';
import { scale } from '@resolutions';
import { CategoryData } from '@reducers';

interface CardProps {
  data?: CategoryData;
  bgLG?: any;
  onPressCard?: (data: any) => void;
}

const Card = ({ data, bgLG, onPressCard }: CardProps) => {
  const onPress = () => {
    if (onPressCard) {
      onPressCard(data);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={bgLG}
        style={styles.linearGradient}>
        <Button onPress={onPress} style={styles.btn}>
          <Text bold style={styles.text}>
            {data?.name}
          </Text>
          <FastImage
            isPath
            source={{ uri: data?.image?.url }}
            style={styles.img}
          />
        </Button>
      </LinearGradient>
    </View>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(20),
  },
  linearGradient: {
    zIndex: 9999,
    borderRadius: radius.radius6,
  },
  text: {
    fontSize: fontSize.fontSize24,
    color: colors.white,
  },
  btn: {
    width: '100%',
    paddingVertical: scale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(15),
  },
  img: {
    width: scale(70),
    height: scale(70),
  },
});
