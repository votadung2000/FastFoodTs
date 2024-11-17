import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { Back, Button, Text, LoadingComponent } from '@components';
import { hScale, scale } from '@resolutions';
import { colors, radius } from '@constants';
import { DeliveryAddressData, deliveryAddressSelector, fetchApiListAddress } from '@reducers';
import { useAppDispatch } from '@store';
import routes from '@routes';

import Card from './Card';

const DeliveryAddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const { address, relatedAddress } = useSelector(deliveryAddressSelector);
  const { isLoadingAddress } = relatedAddress;

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchApiListAddress({}));

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const keyExtractor = (_: any, index: number) => index?.toString();

  const renderItem = ({ item }: { item: DeliveryAddressData }) => {
    return <Card data={item} />;
  };

  const navScreen = () => {
    navigation.navigate(routes.DetailDeliveryAddressScreen);
  };

  return (
    <View style={styles.container}>
      <Back title={'Delivery Address'} />
      <View style={styles.content}>
        <FlatList
          bounces={false}
          data={address}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ccSt}
          ListFooterComponent={
            isLoadingAddress ? (
              <LoadingComponent />
            ) : (
              <Button style={styles.btnAction} onPress={navScreen}>
                <Text medium style={styles.txtAction}>
                  {'ADD NEW ADDRESS'}
                </Text>
              </Button>
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    marginTop: scale(20),
    paddingHorizontal: scale(25),
  },
  ccSt: {
    flexGrow: 1,
    paddingBottom: scale(50),
    padding: scale(1),
  },
  btnAction: {
    width: '80%',
    height: hScale(54),
    borderRadius: scale(27),
    marginBottom: scale(20),
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

export default DeliveryAddressScreen;
