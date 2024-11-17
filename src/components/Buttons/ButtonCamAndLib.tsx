import React, { useState, useRef } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  checkMultiple,
  requestMultiple,
  PermissionStatus,
} from 'react-native-permissions';
import { openCamera, openPicker } from 'react-native-image-crop-picker';
import { getSystemVersion } from 'react-native-device-info';

import { OPTION_IMAGE, DATA_OPTION_IMAGE, OptionImageProps } from '@constants';
import { formatImage } from '@utils';

import ModalSelect from '../Modals/ModalSelect';
import Popup, { PopupProps } from '../Popup';
import { ModalProps } from '../Modals';

import Button from './Button';

let systemVersion = getSystemVersion();

interface ButtonCamAndLibProps {
  disabled?: boolean;
  isCropping?: boolean;
  multiple?: boolean;
  name: string;
  stBtnIcon?: StyleProp<ViewStyle>;
  stContainer?: StyleProp<ViewStyle>;
  Icon?: JSX.Element;
  handleImg?: (images: any) => void;
  setFieldValue: (field: string, value: any) => void;
}

interface OptionProps {
  mediaType?: any;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxFiles?: number;
  cropping?: boolean;
  multiple?: boolean;
}

interface PopupState extends PopupProps {
  isVisible: boolean;
}

interface ModalState extends ModalProps {
  isVisible: boolean;
}

const ButtonCamAndLib = ({
  disabled,
  isCropping,
  multiple = true,
  name,
  stContainer,
  stBtnIcon,
  Icon,
  setFieldValue,
  handleImg,
}: ButtonCamAndLibProps) => {
  const optionRef = useRef<OptionImageProps | null>(null);

  const [popup, setPopup] = useState<PopupState>({ isVisible: false });
  const [modal, setModal] = useState<ModalState>({ isVisible: false });

  const handleCancel = () => {
    setPopup({ isVisible: false });
  };

  const handleAccept = () => {
    openSettings();
  };

  const handleOpenSetting = () => {
    setPopup({
      isVisible: true,
      title: 'Attention',
      content: 'Confirm permission to use the gallery and camera',
      cancel: 'Cancel',
      handleCancel: handleCancel,
      accept: 'Confirm',
      handleAccept: handleAccept,
    });
  };

  const handleRecheckPermission = () => {
    const permissions =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : parseFloat(systemVersion) >= 13
          ? [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
          : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ];
    requestMultiple(permissions).then(statuses => {
      const cameraStatus = statuses[permissions[0]];
      const photoLibraryStatus = statuses[permissions[1]];
      if (
        cameraStatus === RESULTS.GRANTED &&
        photoLibraryStatus === RESULTS.GRANTED
      ) {
        if (OPTION_IMAGE?.CAMERA?.id === optionRef.current?.id) {
          handleImagePickerCamera();
        } else {
          handleImagePickerGallery();
        }
      } else {
        handleOpenSetting();
      }
    });
  };

  const validStatuses: PermissionStatus[] = [
    RESULTS.UNAVAILABLE,
    RESULTS.DENIED,
    RESULTS.LIMITED,
  ];

  const checkPermissionStatus = (statuses: PermissionStatus) => {
    return validStatuses?.includes(statuses);
  };

  const checkMultiplePermission = () => {
    const permissions =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : parseFloat(systemVersion) >= 13
          ? [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
          : [
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ];
    checkMultiple(permissions).then((statuses) => {
      const cameraStatus = statuses[permissions[0]];
      const photoLibraryStatus = statuses[permissions[1]];
      if (
        cameraStatus === RESULTS.GRANTED &&
        photoLibraryStatus === RESULTS.GRANTED
      ) {
        if (OPTION_IMAGE?.CAMERA?.id === optionRef.current?.id) {
          handleImagePickerCamera();
        } else {
          handleImagePickerGallery();
        }
      } else if (
        checkPermissionStatus(cameraStatus) ||
        checkPermissionStatus(photoLibraryStatus)
      ) {
        handleRecheckPermission();
      } else {
        handleOpenSetting();
      }
    });
  };

  const handleImagePickerGallery = async () => {
    let options: OptionProps = {
      mediaType: 'photo',
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 1,
      maxFiles: 10,
      multiple: multiple,
    };
    try {
      let response = await openPicker(options);
      if (response) {
        let formatArr = null;
        if (multiple && Array.isArray(response)) {
          formatArr = response?.map(item => {
            return formatImage(item);
          });
        } else {
          formatArr = formatImage(response);
        }
        if (handleImg) {
          handleImg(formatArr);
        } else {
          setFieldValue(name, formatArr);
        }
      }
    } catch (error) { }
  };

  const handleImagePickerCamera = async () => {
    let options: OptionProps = {
      mediaType: 'photo',
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 1,
      cropping: isCropping ? true : false,
    };
    try {
      let response = await openCamera(options);
      if (response && Object.values(response)?.length > 0) {
        if (handleImg) {
          handleImg(formatImage(response));
        } else {
          setFieldValue(name, formatImage(response));
        }
      }
    } catch (error) { }
  };

  const handleOpenModal = () => {
    setModal({ isVisible: true });
  };

  const onSelectOption = (item: OptionImageProps) => {
    optionRef.current = item;
    setModal({
      isVisible: false,
      onModalHide: () => {
        setTimeout(() => {
          checkMultiplePermission();
        }, 100);
      },
    });
  };

  const handleCloseModal = () => {
    setModal({ isVisible: false });
  };

  return (
    <View style={[styles.container, stContainer]}>
      <Button
        disabled={disabled}
        style={stBtnIcon}
        onPress={handleOpenModal}>
        {Icon && Icon}
      </Button>
      <Popup {...popup} />
      <ModalSelect
        isVector
        labelValue={'name'}
        title={'Select Options'}
        data={DATA_OPTION_IMAGE}
        handleSelect={onSelectOption}
        onBackButtonPress={handleCloseModal}
        onBackdropPress={handleCloseModal}
        {...modal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ButtonCamAndLib;
