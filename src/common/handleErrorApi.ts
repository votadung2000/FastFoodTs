import { Notifer } from '@components';

export const handleErrorApi = (error: any) => {
    const alertType = error?.message ? 'error' : 'warn';
    const title = error?.message || 'Please check your network connection';
    Notifer({ alertType, title });
};
