import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { Back, Button, ImagesViewer, FastImage, Text } from '@components';
import { colors, fontSize, radius } from '@constants';
import { scale, wScale } from '@resolutions';
import { useAppDispatch } from '@store';
import { refetchApiUserProfile, userSelector } from '@reducers';
import routes from '@routes';

import ItemCard from './ItemCard';

interface ImagesViewerProps {
  isVisible?: boolean;
  images?: any;
  index?: number;
  closeModal?: () => void;
}

const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const { user } = useSelector(userSelector);

  const [zoom, setZoom] = useState<ImagesViewerProps>({ isVisible: false });

  useFocusEffect(
    useCallback(() => {
      dispatch(refetchApiUserProfile());

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const navScreen = (screen: string) => {
    navigation.navigate(screen);
  };

  const handleZoomAvatar = () => {
    if (user?.avatar?.url) {
      setZoom({
        isVisible: true,
        images: [{ uri: user?.avatar?.url }],
      });
    } else {
      setZoom({
        isVisible: true,
        images: [{ source: require('@images/avatar.png') }],
      });
    }
  };

  const handleCloseZoom = () => {
    setZoom({ isVisible: false });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@images/bg_profile.png')}
        resizeMode="stretch"
        style={styles.image}
      />
      <ScrollView
        bounces={false}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Back />
        <Button style={styles.btnImg} onPress={handleZoomAvatar}>
          {user?.avatar ? (
            <FastImage
              isPath
              source={{ uri: user?.avatar?.url }}
              style={styles.img}
            />
          ) : (
            <Image source={require('@images/avatar.png')} style={styles.img} />
          )}
        </Button>
        <Button
          style={styles.btnEdit}
          onPress={() => navScreen(routes.EditProfileScreen)}>
          <Text style={styles.txtEdit}>{'Edit Profile'}</Text>
        </Button>
        <View style={styles.content}>
          <ItemCard label={'Name'} value={user?.name || ''} />
          <ItemCard
            label={'Username'}
            value={user?.user_name || ''}
            style={styles.stItemCard}
          />
          <ItemCard
            label={'Phone number'}
            value={user?.phone_number || ''}
            style={styles.stItemCard}
          />
          <ItemCard
            label={'E-mail'}
            value={user?.email || ''}
            style={styles.stItemCard}
          />
          <ItemCard
            label={'Address'}
            value={user?.address || ''}
            style={styles.stItemCard}
          />
        </View>
      </ScrollView>
      <ImagesViewer isPath {...zoom} closeModal={handleCloseZoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  btnImg: {
    width: wScale(110),
    height: wScale(110),
    borderRadius: scale(110),
    marginTop: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  img: {
    width: wScale(90),
    height: wScale(90),
    borderRadius: scale(90),
  },
  btnEdit: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: scale(2),
  },
  txtEdit: {
    fontSize: fontSize.fontSize14,
    color: colors.gray_9796A1,
  },
  scroll: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: scale(25),
    paddingBottom: scale(50),
  },
  stItemCard: {
    marginTop: scale(20),
  },
});

export default ProfileScreen;
