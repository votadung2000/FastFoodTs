import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FormikErrors, useFormik } from 'formik';
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
  Location,
  ModalLoading,
  Notifer,
  SelectType,
  SelectDefault,
} from '@components';
import {
  DATA_TYPE_DELIVERY_ADDRESS,
  DEFAULT_DELIVERY_ADDRESS,
  DefaultDeliveryAddressProps,
  TypeDeliveryAddressProps,
  colors,
  findDefaultDeliveryAddress,
  findTypeDeliveryAddress,
  fontSize,
} from '@constants';
import {
  clearDetailAddress,
  deliveryAddressSelector,
  fetchApiCreateAddress,
  fetchApiDetailAddress,
  fetchApiListAddress,
  fetchApiLocationWithAddress,
  fetchApiLocationWithGeolocation,
  fetchApiUpdateAddress,
  locationSelector,
} from '@reducers';
import { useAppDispatch } from '@store';
import { hScale, scale } from '@resolutions';
import { differentData } from '@utils';
import { ApiBody } from '@common';

import DetailDeliveryAddressSchema from './DetailDeliveryAddressSchema';

interface FormValues {
  recipient_name: string;
  phone_number: string;
  street_address: string;
  city: string;
  country: string;
  postal_code: string;
  type: TypeDeliveryAddressProps;
  default: DefaultDeliveryAddressProps;
  lat: number;
  lon: number;
}

interface FormErrors {
  recipient_name?: string;
  phone_number?: string;
  street_address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  type?: FormikErrors<TypeDeliveryAddressProps>;
}

const initialErrors: FormErrors = {
  recipient_name: '',
  phone_number: '',
  street_address: '',
  city: '',
  country: '',
  postal_code: '',
  type: {},
};

interface LoadingState {
  isVisible: boolean;
  onModalHide?: () => void;
}

const DetailDeliveryAddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const { detailAddress } = useSelector(deliveryAddressSelector);
  const { geolocation } = useSelector(locationSelector);

  const [loading, setLoading] = useState<LoadingState>({ isVisible: false });

  useEffect(() => {
    if (detailAddress) {
      setValues(initialValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailAddress]);

  const initialValues: FormValues = {
    recipient_name: detailAddress?.recipient_name || '',
    phone_number: detailAddress?.phone_number || '',
    street_address: detailAddress?.street_address || '',
    city: detailAddress?.city || '',
    country: detailAddress?.country || '',
    postal_code: detailAddress?.postal_code || '',
    type: findTypeDeliveryAddress(detailAddress?.type) || {},
    default:
      findDefaultDeliveryAddress(detailAddress?.default) ||
      DEFAULT_DELIVERY_ADDRESS.NOT_DEFAULT,
    lat: detailAddress?.lat || '',
    lon: detailAddress?.lon || '',
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues,
    initialErrors,
    validationSchema: DetailDeliveryAddressSchema,
    onSubmit: () => {
      detailAddress ? onSubmitUpdate() : onSubmitCreate();
    },
  });

  const onSubmitCreate = async () => {
    try {
      setLoading({ isVisible: true });

      let body = {
        recipient_name: values.recipient_name,
        phone_number: values.phone_number,
        street_address: values.street_address,
        city: values.city,
        country: values.country,
        postal_code: values.postal_code,
        type: values.type?.type,
        default: values.default?.type,
        lat: geolocation?.lat,
        lon: geolocation?.lon,
      };

      let response = await dispatch(fetchApiCreateAddress(body));

      if (response.payload?.status_code === 200) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            Notifer({
              alertType: 'success',
              title: 'Create Successfully!',
            });
            await dispatch(fetchApiListAddress({}));
            resetForm();
            goBack();
          },
        });
      } else {
        setLoading({ isVisible: false });
      }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  const onSubmitUpdate = async () => {
    try {
      setLoading({ isVisible: true });

      let diffData = differentData(values, initialValues);

      let body: ApiBody = {
        id: detailAddress?.id,
      };

      if (diffData?.recipient_name) {
        body.recipient_name = diffData?.recipient_name;
      }

      if (diffData?.phone_number) {
        body.phone_number = diffData?.phone_number;
      }

      if (diffData?.street_address) {
        body.street_address = diffData?.street_address;
      }

      if (diffData?.city) {
        body.city = diffData?.city;
      }

      if (diffData?.country) {
        body.country = diffData?.country;
      }

      if (diffData?.postal_code) {
        body.postal_code = diffData?.postal_code;
      }

      if (diffData?.type) {
        body.type = diffData?.type?.type;
      }

      if (diffData?.default) {
        body.default = diffData?.default?.type;
      }

      if (diffData?.lat) {
        body.lat = diffData?.lat * 1;
      }

      if (diffData?.lon) {
        body.lon = diffData?.lon * 1;
      }

      let response = await dispatch(fetchApiUpdateAddress(body));

      if (response.payload?.status_code === 200) {
        setLoading({
          isVisible: false,
          onModalHide: async () => {
            Notifer({
              alertType: 'success',
              title: 'Update Successfully!',
            });
            await dispatch(fetchApiDetailAddress({ id: detailAddress?.id }));
            resetForm();
            goBack();
          },
        });
      } else {
        setLoading({ isVisible: false });
      }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  const handleAutoGetLocation = async () => {
    try {
      setLoading({ isVisible: true });

      let response = await dispatch(fetchApiLocationWithGeolocation({}));
      if (response.payload?.status_code === 200) {
        let dataAddress = [];
        let data = response.payload?.data;

        if (data?.address?.house_number) {
          dataAddress.push(data?.address?.house_number);
        }

        if (data?.address?.road) {
          dataAddress.push(data?.address?.road);
        }

        if (data?.address?.quarter) {
          dataAddress.push(data?.address?.quarter);
        }

        if (data?.address?.suburb) {
          dataAddress.push(data?.address?.suburb);
        }

        setFieldValue('street_address', dataAddress?.join(', '));
        setFieldValue('city', data?.address?.city);
        setFieldValue('country', data?.address?.country);
        setFieldValue('postal_code', data?.address?.postcode);
        setFieldValue('lat', data?.lat);
        setFieldValue('lon', data?.lon);

        setLoading({ isVisible: false });
      } else {
        setLoading({ isVisible: false });
      }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  const handleAutoWithAddress = async () => {
    try {
      setLoading({ isVisible: true });

      let body = {
        address: values.street_address,
      };

      let response = await dispatch(fetchApiLocationWithAddress(body));
      let data = response.payload?.data;

      if (response.payload?.status_code === 200 && data?.length > 0) {
        let dataAddress = [];

        if (data[0]?.address?.house_number) {
          dataAddress.push(data[0]?.address?.house_number);
        }

        if (data[0]?.address?.road) {
          dataAddress.push(data[0]?.address?.road);
        }

        if (data[0]?.address?.quarter) {
          dataAddress.push(data[0]?.address?.quarter);
        }

        if (data[0]?.address?.suburb) {
          dataAddress.push(data[0]?.address?.suburb);
        }

        setFieldValue('street_address', dataAddress?.join(', '));
        setFieldValue('city', data[0]?.address?.city);
        setFieldValue('country', data[0]?.address?.country);
        setFieldValue('postal_code', data[0]?.address?.postcode);
        setFieldValue('lat', data[0]?.lat);
        setFieldValue('lon', data[0]?.lon);

        setLoading({ isVisible: false });
      }
    } catch ({ response }: any) {
      setLoading({ isVisible: false });
    }
  };

  const goBack = () => {
    dispatch(clearDetailAddress());
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={false}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Back
          title={'Delivery Address'}
          handleGoBack={goBack}
        />
        <View style={styles.content}>
          <View>
            <Text medium style={styles.title}>
              {'Contact'}
            </Text>
            <Input
              medium
              name="recipient_name"
              placeholder="Recipient name"
              value={values.recipient_name}
              {...{ errors, touched, handleBlur, handleChange }}
            />
            <Input
              medium
              name="phone_number"
              placeholder="Phone number"
              value={values.phone_number}
              keyboardType="number-pad"
              style={styles.input}
              {...{ errors, touched, handleBlur, handleChange }}
            />
          </View>
          <View style={styles.vwBoxForm}>
            <View style={styles.vwBoxFormHeader}>
              <Text medium style={styles.titleDeliveryAddress}>
                {'Delivery Address'}
              </Text>
              <Button style={styles.btnAuto} onPress={handleAutoGetLocation}>
                <Text medium style={styles.txtAuto}>
                  {'Auto'}
                </Text>
              </Button>
            </View>
            <Input
              medium
              name="street_address"
              placeholder="Street address"
              value={values.street_address}
              inputStyle={styles.inputStyleStreetAddress}
              Icon={
                values.street_address?.length > 0 ? (
                  <Button
                    style={styles.btnSync}
                    onPress={handleAutoWithAddress}>
                    <Entypo
                      name="cycle"
                      size={scale(22)}
                      color={colors.orange_FE724C}
                    />
                  </Button>
                ) : null
              }
              {...{ errors, touched, handleBlur, handleChange }}
            />
            <Input
              medium
              name="city"
              placeholder="City"
              value={values.city}
              style={styles.input}
              {...{ errors, touched, handleBlur, handleChange }}
            />
            <View style={styles.vwHorizontal}>
              <Input
                medium
                name="country"
                placeholder="Country"
                value={values.country}
                style={styles.inputCountry}
                {...{ errors, touched, handleBlur, handleChange }}
              />
              <Input
                medium
                name="postal_code"
                placeholder="Postal code"
                value={values.postal_code}
                style={styles.inputPostalCode}
                {...{ errors, touched, handleBlur, handleChange }}
              />
            </View>
          </View>
          <View style={styles.vwBoxForm}>
            <Text medium style={styles.title}>
              {'Setting'}
            </Text>
            <SelectType
              name="type"
              value={values.type}
              data={DATA_TYPE_DELIVERY_ADDRESS}
              {...{ errors, touched, setFieldValue }}
            />
            <SelectDefault
              name="default"
              value={values.default}
              stContainer={styles.stSelectDefault}
              {...{ errors, touched, setFieldValue }}
            />
          </View>
          <Button
            style={styles.btnComplete}
            onPress={() => handleSubmit()}
          >
            <Text bold style={styles.txtComplete}>
              {'COMPLETE'}
            </Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <Location handleCancelLocation={goBack} />
      <ModalLoading {...loading} />
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
  content: {
    flex: 1,
    marginTop: scale(25),
    paddingHorizontal: scale(25),
  },
  vwBoxForm: {
    marginTop: scale(20),
  },
  vwBoxFormHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  title: {
    color: colors.gray_9796A1,
    marginBottom: scale(10),
  },
  titleDeliveryAddress: {
    color: colors.gray_9796A1,
  },
  btnAuto: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: colors.orange_FE724C,
  },
  txtAuto: {
    color: colors.orange_FE724C,
  },
  inputStyleStreetAddress: {
    paddingRight: scale(45),
  },
  btnSync: {
    position: 'absolute',
    right: scale(5),
    paddingHorizontal: scale(5),
    zIndex: 9999,
  },
  vwHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginTop: scale(20),
  },
  inputCountry: {
    width: '60%',
    marginTop: scale(20),
  },
  inputPostalCode: {
    width: '38%',
    marginTop: scale(20),
  },
  stSelectDefault: {
    marginTop: scale(20),
  },
  btnComplete: {
    width: '80%',
    height: hScale(60),
    borderRadius: scale(30),
    marginTop: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orange_FD724C,
    paddingVertical: scale(14),
  },
  txtComplete: {
    fontSize: fontSize.fontSize14,
    color: colors.white,
  },
});

export default DetailDeliveryAddressScreen;
