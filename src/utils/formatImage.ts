import { Platform } from 'react-native';

interface FormatImageProps {
  path?: string;
  size?: number;
  modificationDate?: string;
}

export default ({ path, size, modificationDate = '' }: FormatImageProps) => {
  if (!path) {
    return;
  }

  let uriMedia = Platform.OS === 'android' ? path : path.replace('file://', '');
  let nameMedia = uriMedia.split('/').pop();
  let typeMedia = uriMedia.split('.').pop();

  return {
    id: modificationDate + nameMedia,
    name: nameMedia,
    type: `image/${typeMedia}`,
    uri: uriMedia,
    size: size,
    local: true,
  };
};
