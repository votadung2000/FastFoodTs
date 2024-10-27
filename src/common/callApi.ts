import { AxiosError } from 'axios';

import { Root } from '@common';

export const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
        const response: Root = await apiCall();

        if (response.data?.status_code === 200) {
            return response.data;
        } else {
            return Promise.reject('No data returned');
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || 'Something went wrong';
    }
};
