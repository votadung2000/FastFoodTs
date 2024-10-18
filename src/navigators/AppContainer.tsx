import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { SplashScreen } from '@screens';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

import { addAuth, authSelector } from '@reducers';

const AppContainer = () => {
    const dispatch = useDispatch();

    const auth = useSelector(authSelector);

    const [isShowSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowSplash(false);
        }, 2000);

        checkLogin();

        return () => {
            clearTimeout(timeout);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkLogin = () => {
        const token = '';

        token && dispatch(addAuth({ token }));
    };

    return (
        <View style={styles.container}>
            <StatusBar
                translucent
                barStyle={'dark-content'}
                backgroundColor={'transparent'}
            />
            {
                isShowSplash ? <SplashScreen /> : (
                    <NavigationContainer>
                        {
                            true
                                ? <MainNavigator />
                                : <AuthNavigator />
                        }
                    </NavigationContainer>
                )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppContainer;
