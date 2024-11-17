import React, { createRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, Image as RNImage, TextInput } from 'react-native';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  Input,
  Text,
  Button,
  Back,
  ImagesViewer,
  ModalLoading,
  Notifer,
  ButtonCamAndLib,
  FastImage,
} from '@components';
import { colors, fontSize, radius } from '@constants';
import { hScale, scale, wScale } from '@resolutions';
import { useAppDispatch } from '@store';
import { fetchApiUpdateProfile, userSelector } from '@reducers';
import { Image } from '@common';
import { differentData } from '@utils';

import EditProfileSchema from './EditProfileSchema';

interface ImageEditProfileProps extends Image {
  uri?: any;
}

interface FormValues {
  name: string,
  user_name: string,
  phone_number: string,
  email: string,
  address: string,
  avatar?: ImageEditProfileProps,
}

interface FormErrors {
  name?: string,
  user_name?: string,
  phone_number?: string,
  email?: string,
  address?: string,
}

const initialErrors: FormErrors = {
  name: '',
  user_name: '',
  phone_number: '',
  email: '',
  address: '',
};

interface LoadingState {
  isVisible: boolean;
  onModalHide?: () => void;
}

interface ImagesViewerProps {
  isVisible?: boolean;
  images?: any;
  index?: number;
  closeModal?: () => void;
}

const EditProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const { user } = useSelector(userSelector);

  const refUsername = createRef<TextInput>();
  const refPhoneNumber = createRef<TextInput>();
  const refEmail = createRef<TextInput>();
  const refAddress = createRef<TextInput>();

  const [loading, setLoading] = useState<LoadingState>({ isVisible: false });
  const [zoom, setZoom] = useState<ImagesViewerProps>({ isVisible: false });

  const initialValues: FormValues = {
    name: user?.name || '',
    user_name: user?.user_name || '',
    phone_number: user?.phone_number || '',
    email: user?.email || '',
    address: user?.address || '',
    avatar: user?.avatar || '',
  };

  const {
    values,
    errors,
    isValid,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    initialErrors,
    validationSchema: EditProfileSchema,
    onSubmit: () => handleUploadImg(),
  });

  const handleUploadImg = async () => {
    try {
      setLoading({ isVisible: true });
      // let response = await fetchApiUploadImg(values.avatar);
      // if (response) {
      //   handleUpdateProfile(response);
      // }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  const handleUpdateProfile = async (img: any) => {
    try {
      let body = {
        name: values.name,
        user_name: values.user_name,
        phone_number: values.phone_number,
        email: values.email,
        address: values.address,
        avatar_id: img?.id,
      };
      let diffData = differentData(body, initialValues);

      let response = await dispatch(fetchApiUpdateProfile(diffData));
      if (response.payload?.status_code === 200) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            resetForm();
            Notifer({
              alertType: 'success',
              title: 'Update Successfully!',
            });
            navigation.goBack();
          },
        });
      }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  const focusUsername = () => {
    refUsername.current?.focus();
  };

  const focusPhoneNumber = () => {
    refPhoneNumber.current?.focus();
  };

  const focusEmail = () => {
    refEmail.current?.focus();
  };

  const focusAddress = () => {
    refAddress.current?.focus();
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
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('@images/bg_profile.png')}
          resizeMode="stretch"
          style={styles.image}
        />
        <Back />
        <Button style={styles.btnImg} onPress={handleZoomAvatar}>
          {values?.avatar ? (
            values?.avatar?.uri ? (
              <FastImage
                source={{ uri: values?.avatar?.uri }}
                style={styles.img}
              />
            ) : (
              <FastImage
                isPath
                source={{ uri: values?.avatar?.url }}
                style={styles.img}
              />
            )
          ) : (
            <RNImage source={require('@images/avatar.png')} style={styles.img} />
          )}
          <ButtonCamAndLib
            multiple={false}
            name="avatar"
            Icon={
              <View style={styles.vwIcon}>
                <Entypo
                  name="camera"
                  size={scale(16)}
                  color={colors.gray_B3B3B3}
                />
              </View>
            }
            stContainer={styles.stContainerIcon}
            {...{ setFieldValue }}
          />
        </Button>
        <View style={styles.content}>
          <View style={styles.form}>
            <Input
              medium
              label="Name"
              name="name"
              placeholder="Enter your name"
              value={values.name}
              returnKeyType="next"
              style={styles.input}
              onSubmitEditing={focusUsername}
              {...{ errors, touched, handleBlur, handleChange }}
            />
            <Input
              medium
              ref={refUsername}
              label="Username"
              name="user_name"
              placeholder="Enter your username"
              value={values.user_name}
              returnKeyType="next"
              style={styles.input}
              onSubmitEditing={focusPhoneNumber}
              {...{ errors, touched, handleBlur, handleChange }}
            />
            <Input
              medium
              ref={refPhoneNumber}
              label="Phone number"
              name="phone_number"
              placeholder="Enter your phone number"
              value={values.phone_number}
              returnKeyType="next"
              keyboardType="number-pad"
              style={styles.input}
              onSubmitEditing={focusEmail}
              {...{ errors, touched, handleBlur, handleChange }}
            />
            <Input
              medium
              ref={refEmail}
              label="E-mail"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              returnKeyType="next"
              style={styles.input}
              onSubmitEditing={focusAddress}
              {...{ errors, touched, handleBlur, handleChange }}
            />
            <Input
              medium
              ref={refAddress}
              label="Address"
              name="address"
              placeholder="Enter your address"
              value={values.address}
              returnKeyType="next"
              style={styles.input}
              onSubmitEditing={handleSubmit}
              {...{ errors, touched, handleBlur, handleChange }}
            />
          </View>
          <Button
            disabled={!isValid}
            style={styles.btnConfirm}
            onPress={() => handleSubmit()}>
            <Text bold style={styles.textConfirm}>
              {'CONFIRM'}
            </Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <ModalLoading {...loading} />
      <ImagesViewer isPath {...zoom} closeModal={handleCloseZoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingBottom: scale(50),
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
  stContainerIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwIcon: {
    width: wScale(40),
    height: wScale(40),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    ...radius.shadow,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(25),
  },
  title: {
    fontSize: fontSize.fontSize34,
    textAlign: 'left',
    marginTop: scale(20),
  },
  form: {
    marginTop: scale(25),
  },
  input: {
    marginBottom: scale(20),
  },
  txtForgotPass: {
    fontSize: fontSize.fontSize14,
    color: colors.orange_FE724C,
  },
  btnConfirm: {
    width: '80%',
    height: hScale(60),
    borderRadius: scale(30),
    marginTop: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FD724C,
    paddingVertical: scale(14),
  },
  textConfirm: {
    fontSize: fontSize.fontSize14,
    color: colors.white,
  },
  vwQuestion: {
    marginTop: scale(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtQuestion: {
    fontSize: fontSize.fontSize14,
    color: colors.blue_5B5B5E,
  },
});

export default EditProfileScreen;
