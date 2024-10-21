import { AxiosError } from "axios";

export const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
        const response = await apiCall();
        return response.data || Promise.reject('No data returned');
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || 'Something went wrong';
    }
};