import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    OnboardingScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    OTPScreen,
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
            <Stack.Screen name={routes.OnboardingScreen} component={OnboardingScreen} />
            <Stack.Screen name={routes.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={routes.RegisterScreen} component={RegisterScreen} />
            <Stack.Screen name={routes.ResetPasswordScreen} component={ResetPasswordScreen} />
            <Stack.Screen name={routes.OTPScreen} component={OTPScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
