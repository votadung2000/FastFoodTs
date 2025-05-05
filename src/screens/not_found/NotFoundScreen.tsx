import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Text } from '@components';
import { colors, fontSize, radius } from '@constants';
import { hScale, scale, wScale } from '@resolutions';
import routes from '@routes';

const NotFoundScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const goBack = () => {
    navigation.reset({ index: 0, routes: [{ name: routes.RoutesNavigator }] });
  };

  return (
    <View style={styles.container}>
      <Image source={require('@images/not_found.jpg')} style={styles.img} />
      <Text bold style={styles.txt}>
        {'404 Page Not Found'}
      </Text>
      <Button
        style={styles.btnAction}
        onPress={goBack}
      >
        <Text medium style={styles.txtAction}>
          {'Go Back'}
        </Text>
      </Button>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: wScale(300),
    height: wScale(300),
  },
  txt: {
    marginTop: scale(10),
    fontSize: fontSize.fontSize20,
  },
  btnAction: {
    width: '60%',
    height: hScale(54),
    borderRadius: scale(27),
    marginTop: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FE724C,
    ...radius.shadow,
  },
  txtAction: {
    color: colors.white,
  },
});
