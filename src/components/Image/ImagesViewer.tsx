import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
// import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '@constants';
import { scale } from '@resolutions';

import Button from '../Buttons/Button';
import Modal from '../Modals/Modal';

interface IImageInfo {
  url: string;
  width?: number;
  height?: number;
  props?: {
    source?: any;
  };
  freeHeight?: boolean;
}

interface ImageProps {
  uri?: string;
  source?: any;
}

interface ImagesViewerProps {
  images?: ImageProps[];
  index?: number;
  closeModal?: () => void;
}

const ImagesViewer = ({ images, index = 0, closeModal, ...rest }: ImagesViewerProps) => {
  const imageUrls = images?.map(ele => {
    if (ele?.uri) {
      return { url: ele?.uri };
      // return ele?.uri;
    }
    if (ele?.source) {
      return {
        url: '',
        props: {
          source: ele?.source,
        },
      };
      // return ele?.source;
    }
  }) as IImageInfo[];

  // const currentImage = imageUrls ? imageUrls[index] : undefined;

  const renderHeader = () => (
    <View style={styles.header}>
      <Button onPress={closeModal} style={styles.btnClose}>
        <Ionicons
          size={scale(28)}
          name="ios-close-circle-sharp"
          color={colors.white}
        />
      </Button>
    </View>
  );

  const loadingRender = () => (
    <ActivityIndicator size="small" color={colors.white} />
  );

  return (
    <Modal {...rest}>
      {/* <ImageZoom uri={currentImage} /> */}
      <ImageViewer
        useNativeDriver
        enableSwipeDown
        index={index || 0}
        imageUrls={imageUrls}
        loadingRender={loadingRender}
        renderHeader={renderHeader}
        backgroundColor="rgba(0, 0, 0, 0.5)"
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 999,
    position: 'absolute',
    right: 0,
    top: isIphoneX() ? 30 : 10,
    alignItems: 'flex-end',
  },
  btnClose: {
    paddingLeft: scale(5),
    paddingRight: scale(12),
    paddingVertical: scale(3),
  },
});

export default React.memo(ImagesViewer);
