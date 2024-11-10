import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from '@routes';

import {
    DetailCardSearch,
    HistoryOrderScreen,
    OrderDetailsScreen,
    OrderScreen,
    ProductsDetailScreen,
    UpcomingOrderScreen,
} from '@screens';

import BottomTabNavigator from './BottomTabNavigator';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name={routes.BottomTabNavigator} component={BottomTabNavigator} />
            <Stack.Screen name={routes.ProductsDetailScreen} component={ProductsDetailScreen} />
            <Stack.Screen name={routes.DetailCardSearch} component={DetailCardSearch} />
            <Stack.Screen name={routes.OrderScreen} component={OrderScreen} />
            <Stack.Screen name={routes.UpcomingOrderScreen} component={UpcomingOrderScreen} />
            <Stack.Screen name={routes.HistoryOrderScreen} component={HistoryOrderScreen} />
            <Stack.Screen name={routes.OrderDetailsScreen} component={OrderDetailsScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
