import React, {  useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PERMISSIONS, request } from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
import RNBootSplash from 'react-native-bootsplash';

import {
    CarouselScreen,
    NotFoundScreen,
} from '@screens';
import { Notifer } from '@components';
import { useAppDispatch } from '@store';
import { refetchApiUserProfile } from '@reducers';
import { linking } from '@utils';
import routes from '@routes';

import RoutesNavigator from './RoutesNavigator';

const AppContainer = () => {
    const Stack = createNativeStackNavigator();

    const dispatch = useAppDispatch();


    useEffect(() => {
        RNBootSplash.hide();

        NetInfo.addEventListener(state => {
            if (!state?.isConnected) {
                Notifer({
                    alertType: 'error',
                    title: 'Disconnected',
                    des: 'Please check the network connect!',
                });
            }
        });

        if (Platform.OS === 'ios') {
            request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
                .then(result => console.log('APP_TRACKING_TRANSPARENCY.result', result))
                .catch(error => console.log('APP_TRACKING_TRANSPARENCY.error', error));
        }

        dispatch(refetchApiUserProfile());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View style={styles.container}>
            {
                <NavigationContainer linking={linking}>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            gestureEnabled: false,
                            animation: 'slide_from_right',
                        }}
                    >
                        <Stack.Screen name={routes.CarouselScreen} component={CarouselScreen} />
                        <Stack.Screen name={routes.RoutesNavigator} component={RoutesNavigator} />
                        <Stack.Screen name={routes.NotFoundScreen} component={NotFoundScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
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
