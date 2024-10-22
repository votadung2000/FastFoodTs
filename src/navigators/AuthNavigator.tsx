import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    WelcomeScreen,
    LoginScreen,
    RegisterScreen,
} from '@screens';
import routes from '@routes';

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name={routes.WelcomeScreen} component={WelcomeScreen} />
            <Stack.Screen name={routes.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={routes.RegisterScreen} component={RegisterScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
