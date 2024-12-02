import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, fontSize, radius } from '@constants';
import { hScale, scale } from '@resolutions';

import Button from '../Buttons/Button';
import Text from '../Text';

interface SelectTypeProps {
  name: string;
  value: any;
  data: any;
  touched?: any;
  errors?: any;
  setFieldValue: (field: string, value: any) => void;
}

const SelectType = ({
  name,
  value,
  data,
  touched,
  errors,
  setFieldValue,
}: SelectTypeProps) => {
  const handleSelect = (item: any) => {
    if (setFieldValue) {
      setFieldValue(name, item);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <Text medium>{'Address type: '}</Text>
        <View style={styles.content}>
          {data?.map((ele: any, index: number) => {
            let isSelected = value?.id === ele?.id;

            return (
              <Button
                key={index?.toString()}
                style={[styles.btnEle, isSelected && styles.btnEleSelected]}
                onPress={() => handleSelect(ele)}>
                <Text
                  medium
                  style={[styles.txtEle, isSelected && styles.txtEleSelected]}>
                  {ele?.name || ''}
                </Text>
              </Button>
            );
          })}
        </View>
      </View>
      {touched?.[name] && errors?.[name] ? (
        <Text style={styles.error}>{errors?.[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    height: hScale(64),
    borderColor: colors.gray_EEEEEE,
    borderWidth: 1,
    borderRadius: radius.radius10,
    paddingLeft: scale(20),
    paddingRight: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnEle: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    backgroundColor: colors.gray_EEEEEE,
    marginLeft: scale(8),
    borderRadius: radius.radius4,
  },
  btnEleSelected: {
    backgroundColor: colors.white,
    borderWidth: scale(1),
    borderColor: colors.orange_FE724C,
  },
  txtEle: {
    fontSize: fontSize.fontSize14,
    color: colors.gray_9796A1,
  },
  txtEleSelected: {
    color: colors.orange_FE724C,
  },
  error: {
    color: colors.redSystem,
    fontSize: fontSize.fontSize11,
    marginTop: scale(5),
  },
});

export default SelectType;
