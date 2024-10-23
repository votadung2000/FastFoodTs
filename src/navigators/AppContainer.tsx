import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';

import { CarouselScreen, SplashScreen } from '@screens';
import { Notifer } from '@components';
import routes from '@routes';

import RoutesNavigator from './RoutesNavigator';

const AppContainer = () => {
    const Stack = createNativeStackNavigator();

    const [isShowSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowSplash(false);
        }, 2000);

        NetInfo.addEventListener(state => {
            if (!state?.isConnected) {
                Notifer({
                    alertType: 'error',
                    title: 'Disconnected',
                    des: 'Please check the network connect!',
                });
            }
        });

        // if (Platform.OS === 'ios') {
        //     request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
        //         .then(result => console.log(result))
        //         .catch(error => console.log(error));
        // }

        return () => {
            clearTimeout(timeout);
        };


    }, []);

    return (
        <View style={styles.container}>
            {
                isShowSplash ? <SplashScreen /> : (
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false,
                                gestureEnabled: false,
                                animation: 'slide_from_right',
                            }}
                        >
                            <Stack.Screen name={routes.CarouselScreen} component={CarouselScreen} />
                            <Stack.Screen name={routes.RoutesNavigator} component={RoutesNavigator} />
                        </Stack.Navigator>
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
