import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image as RNImage,
  StyleProp,
  ViewStyle,
} from 'react-native';
import RNFastImage, { Source, ResizeMode, ImageStyle } from 'react-native-fast-image';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Config from 'react-native-config';

import { checkIfValidUUID } from '@utils';
import { colors, radius } from '@constants';
import { scale } from '@resolutions';

interface FastImageFCProps {
  isPath?: boolean;
  source?: Source;
  resizeMode?: ResizeMode;
  style?: StyleProp<ImageStyle>;
  handleError?: () => void;
}

const FastImage = ({
  isPath,
  source,
  resizeMode,
  style,
  handleError,
  ...rest
}: FastImageFCProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  useEffect(() => {
    const fetchImageSize = async () => {
      if (isPath) {
        const imageUrl = `${Config.API_IMAGE}${source?.uri}`;
        RNImage.getSize(`${Config.API_IMAGE}${source?.uri}`, (width, height) => {
          setAspectRatio(width > 0 && height > 0 ? width / height : 1);
        });
      } else if (source?.uri) {
        RNImage.getSize(source?.uri, (width, height) => {
          setAspectRatio(width > 0 && height > 0 ? width / height : 1);
        });
      }
    };

    fetchImageSize();
  }, [isPath, source]);

  const onError = () => {
    const dataUri = source?.uri?.split('/');
    const id = dataUri && dataUri.length > 0 ? dataUri[dataUri.length - 1] : '';
    if (!isError && id !== 'undefined' && !checkIfValidUUID(id)) {
      setIsError(true);
      handleError && handleError();
    }
  };

  if (!source?.uri || isError) {
    return (
      <View style={[styles.error, style]}>
        <MCIcons
          name="image-remove"
          color={colors.graySystem}
          size={scale(32)}
        />
      </View>
    );
  }

  return (
    <RNFastImage
      {...rest}
      source={isPath ? { uri: `${Config.API_IMAGE}${source?.uri}` } : source}
      resizeMode={resizeMode || RNFastImage.resizeMode?.cover}
      style={[styles.img, { aspectRatio }, style]}
      onError={onError}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    borderRadius: radius.radius6,
  },
  error: {
    paddingVertical: scale(5),
    borderRadius: radius.radius10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default React.memo(FastImage);
