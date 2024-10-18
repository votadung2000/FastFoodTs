import React from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Text, Button, FastImage} from '@components';
import {colors, fontSize, radius} from '@constant';
import {limitedString} from '@utils';
import {useStore} from '@context';
import {scale} from '@resolutions';

const CardMenu = ({data}) => {
  const {
    favoritesStore: {filterFavorites, fetchApiListFavorites},
  } = useStore();

  const handleItem = () => {
    if (filterFavorites?.category_id?.id !== data?.id) {
      fetchApiListFavorites({category_id: data});
    }
  };

  return (
    <Button
      onPress={() => handleItem()}
      style={[
        styles.container,
        data?.id === filterFavorites?.category_id?.id
          ? styles.upShadow
          : styles.shadow,
      ]}>
      <FastImage
        isPath
        source={{uri: data?.image?.url}}
        style={styles.imgMenu}
      />
      <Text bold style={styles.txtItem}>
        {limitedString(data.name, 6) || ''}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: radius.radius10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: scale(10),
    backgroundColor: colors.white,
  },
  imgMenu: {
    width: scale(42),
    height: scale(42),
    borderRadius: radius.radius10,
    marginBottom: scale(8),
  },
  txtItem: {
    fontSize: fontSize.smaller,
  },
  upShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default observer(CardMenu);
