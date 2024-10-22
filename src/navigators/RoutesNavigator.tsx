import React from 'react';
import { useSelector } from 'react-redux';

import { userSelector } from '@reducers';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RoutesNavigator = () => {
    const user = useSelector(userSelector);

    return (
        user
            ? <MainNavigator />
            : <AuthNavigator />
    );
};

export default RoutesNavigator;
