import React from 'react';
import { StyleSheet, View, FlatList, StyleProp, TextStyle } from 'react-native';

import { colors, fontSize, radius } from '@constants';
import { scale } from '@resolutions';

import Modal from './Modal';
import Text from '../Text';
import Button from '../Buttons/Button';
import Loading from '../Loading';

interface ModalSelectProps {
  isVector?: boolean,
  value?: any;
  title?: string;
  data?: any;
  stName?: StyleProp<TextStyle>;
  labelValue?: string;
  handleSelect?: (item: any) => void;
}

const ModalSelect = ({
  isVector,
  value,
  title,
  data,
  stName,
  labelValue = '',
  handleSelect,
  ...rest
}: ModalSelectProps) => {
  const keyExtractor = (_: any, index: number) => index?.toString();

  const onSelect = (item: any) => {
    if (handleSelect) {
      handleSelect(item);
    }
  };

  const renderItem = ({ item }: any) => {
    const isSelect = value?.id === item?.id;
    return (
      <Button key={item?.id} style={styles.btn} onPress={() => onSelect(item)}>
        {item?.Icon && <View style={styles.vwIcon}>
          {isVector
            ? (<item.Icon {...item.iconProps} />)
            : item?.Icon}
        </View>}
        <Text medium style={[isSelect && styles.txtBtnSelect, stName]}>
          {item[labelValue] || ''}
        </Text>
      </Button>
    );
  };

  return (
    <Modal stModal={styles.stModal} {...rest}>
      <View style={styles.container}>
        {title && (
          <Text bold style={styles.title}>
            {title}
          </Text>
        )}
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.stFL}
          ListEmptyComponent={<Loading />}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  stModal: {
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    maxHeight: '70%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderTopStartRadius: radius.radius20,
    borderTopEndRadius: radius.radius20,
  },
  title: {
    fontSize: fontSize.fontSize18,
    textAlign: 'center',
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  stFL: {},
  btn: {
    maxWidth: '70%',
    marginBottom: scale(20),
    paddingBottom: scale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray_C4C4C4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  vwIcon: {
    marginRight: scale(20),
  },
  txtBtnSelect: {
    color: colors.orange_FE724C,
  },
});

export default ModalSelect;
