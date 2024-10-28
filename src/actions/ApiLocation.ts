import Config from 'react-native-config';
import axios from 'axios';

import { ApiBody } from '@common';

import ApiRoutes from './ApiRoutes';

let appName = 'FOOD HUB';

const axiosLocation = axios.create();

axiosLocation.interceptors.request.use(
  async config => {
    config.baseURL = Config.API_LOCATION;
    config.headers['User-Agent'] = appName;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosLocation.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (__DEV__) {
      if (!error?.response) {
        console.log(error);
      } else {
        const { config, status, data } = error?.response || {};
        console.log(`URL: ${config?.url}\n`, `STATUS: ${status}\n`, data);
      }
    }
    return Promise.reject(error);
  },
);

export const ApiApiLocationWithGeolocation = (params: ApiBody = {}) => {
  return axiosLocation({
    method: 'get',
    url: ApiRoutes.nominatim_reverse,
    params,
  });
};

export const ApiApiLocationWithAddress = (params: ApiBody = {}) => {
  return axiosLocation({
    method: 'get',
    url: ApiRoutes.nominatim_search,
    params,
  });
};
