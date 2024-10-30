import { Platform } from 'react-native';
import {
  getSystemVersion,
  getVersion,
} from 'react-native-device-info';
import axios, {
  InternalAxiosRequestConfig,
  AxiosHeaders,
  AxiosResponse,
  AxiosError,
} from 'axios';
import Config from 'react-native-config';
import uuid from 'react-native-uuid';

import { clearToken, getToken } from '@storage';
import { ApiBody } from '@common';

import ApiRoutes from './ApiRoutes';

// Android os = 2
const infoDevices = {
  unique_id: uuid.v4(),
  device_info: {
    os: Platform.OS === 'android' ? 2 : 1,
    ver: getSystemVersion(),
  },
  app_info: {
    os: Platform.OS === 'android' ? 2 : 1,
    ver: getVersion(),
  },
};

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    config.baseURL = Config.API_HOST_V1;
    if (
      config.url &&
      !config.url.includes(ApiRoutes.login) &&
      !config.url.includes(ApiRoutes.register)
    ) {
      const token = await getToken();
      if (token) {
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (__DEV__) {
      if (!error?.response) {
        console.log(error);
      } else {
        const { config, status, data } = error.response;
        console.log(`URL: ${config?.url}\nSTATUS: ${status}\n`, data);

        if (typeof data === 'object' && data !== null && 'error_key' in data) {
          if (status === 400 && (data as { error_key: string }).error_key === 'ERR_TOKEN_NOT_FOUND') {
            await clearToken();
          }
        } else {
          console.log(`URL: ${config?.url}\nSTATUS: ${status}\nNo error_key found.`);
        }
      }
    }
    return Promise.reject(error);
  },
);

export const ApiLogin = (body: ApiBody) => {
  const data = { ...body, ...infoDevices };
  return axios.post(ApiRoutes.login, data);
};

export const ApiRegister = (body: ApiBody) => {
  const data = { ...body, ...infoDevices };
  return axios.post(ApiRoutes.register, data);
};

export const ApiUserProfile = () => {
  return axios.get(ApiRoutes.profile);
};

export const ApiUpdateProfile = (data: ApiBody) => {
  return axios.patch(ApiRoutes.updateProfile, data);
};

export const ApiUpdatePassword = (data: ApiBody) => {
  return axios.patch(ApiRoutes.updatePassword, data);
};

export const ApiListCategories = () => {
  return axios.get(ApiRoutes.category);
};

export const ApiListProducts = (params?: ApiBody) => {
  return axios.get(ApiRoutes.product, { params });
};

export const ApiDetailProduct = (id: number) => {
  return axios.get(`${ApiRoutes.product}/${id}`);
};

export const ApiFavorites = (params?: ApiBody) => {
  return axios.get(ApiRoutes.favorite, { params });
};

export const ApiCDFavorite = (data: ApiBody) => {
  return axios.post(`${ApiRoutes.favorite}/cd_favorite`, data);
};

export const ApiCreateOrder = (data: ApiBody) => {
  return axios.post(ApiRoutes.order, data);
};

export const ApiListOrder = (params?: ApiBody) => {
  return axios.get(ApiRoutes.order, { params });
};

export const ApiDetailOrder = (id: string) => {
  return axios.get(`${ApiRoutes.order}/${id}`);
};

export const ApiUpdateOrder = ({ id, data }: { id: string; data: ApiBody }) => {
  return axios.patch(`${ApiRoutes.order}/${id}`, data);
};

export const ApiDeliveryAddress = (params?: ApiBody) => {
  return axios.get(ApiRoutes.deliveryAddress, { params });
};

export const ApiDetailDeliveryAddress = (id: string) => {
  return axios.get(`${ApiRoutes.deliveryAddress}/${id}`);
};

export const ApiCreateAddress = (data: ApiBody) => {
  return axios.post(ApiRoutes.deliveryAddress, data);
};

export const ApiUpdateAddress = ({
  id,
  data,
}: {
  id: string;
  data: ApiBody;
}) => {
  return axios.patch(`${ApiRoutes.deliveryAddress}/${id}`, data);
};

export const ApiCurrentAddress = () => {
  return axios.get(ApiRoutes.currentDeliveryAddress);
};

export const ApiDeleteAddress = (id: string) => {
  return axios.delete(`${ApiRoutes.deliveryAddress}/${id}`);
};

export const ApiListFAQs = (params?: ApiBody) => {
  return axios.get(ApiRoutes.faq, { params });
};
