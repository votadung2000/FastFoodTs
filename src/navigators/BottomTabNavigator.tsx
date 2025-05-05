import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { Animated, Platform, Dimensions, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import RNIonicons from 'react-native-vector-icons/Ionicons';

import {
    HomeScreen,
    SearchScreen,
    CartScreen,
    FavoriteScreen,
    NotificationScreen,
} from '@screens';
import { Menu } from '@components';
import { hScale, scale, wScale } from '@resolutions';
import { colors, fontSize, radius } from '@constants';
import { animatedMenuSelector } from '@reducers';
import routes, { RouteNames } from '@routes';

const { width } = Dimensions.get('window');

const Ionicons = RNIonicons as any;
interface BottomTabItem {
    id: number;
    name: RouteNames;
    keyLabel: string;
    Icon: JSX.Element;
    IconFocused: JSX.Element;
    component: React.ComponentType<any>;
}

interface BottomTabIconProps {
    data: BottomTabItem;
    focused: boolean;
}

const BottomTabIcon = memo(({ data, focused }: BottomTabIconProps) => {
    return (
        <View style={styles.containerViewTab}>
            <View style={styles.vwIconViewTab}>
                {focused ? data?.IconFocused : data?.Icon}
                {/* {data?.name === routes.CartScreen && cartProducts?.length > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.counter}>
                            {`${formatCount(cartProducts?.length)}`}
                        </Text>
                    </View>
                )} */}
            </View>
        </View>
    );
});


const getTabBarIcon = (item: BottomTabItem, focused: boolean) => {
    return <BottomTabIcon data={item} focused={focused} />;
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;

    const { triggerMenu } = useSelector(animatedMenuSelector);

    const [isShowMenu, setShowMenu] = useState(true);

    useEffect(() => {
        handleShowMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerMenu]);

    const handleShowMenu = useCallback(() => {
        Animated.parallel([
            Animated.timing(scaleValue, {
                toValue: isShowMenu ? 1 : 0.8,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(offsetValue, {
                toValue: isShowMenu ? 0 : width * 0.6,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        setShowMenu(!isShowMenu);
    }, [isShowMenu, scaleValue, offsetValue]);

    return (
        <View style={styles.container}>
            <Menu />
            <Animated.View
                style={[
                    styles.vwScreen,
                    isShowMenu && styles.stBorderRadius,
                    {
                        transform: [{ scale: scaleValue }, { translateX: offsetValue }],
                    },
                ]}>
                {isShowMenu ? <View style={styles.disable} /> : null}
                <View style={[styles.content, isShowMenu && styles.stBorderRadius]}>
                    <Tab.Navigator
                        initialRouteName={routes.HomeScreen}
                        backBehavior="initialRoute"
                        sceneContainerStyle={isShowMenu && styles.stBorderRadius}
                        screenOptions={{
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarStyle: [
                                styles.tabBarStyle,
                                isShowMenu && styles.stBorderLeftRadius,
                            ],
                        }}>
                        {BottomTabArr.map(item => (
                            <Tab.Screen
                                key={item.id}
                                name={item.name}
                                component={item.component}
                                options={{
                                    tabBarIcon: ({ focused }) => getTabBarIcon(item, focused),
                                }}
                            />
                        ))}
                    </Tab.Navigator>
                </View>
            </Animated.View>
        </View>
    );
};

const BottomTabArr: BottomTabItem[] = [
    {
        id: 1,
        name: routes.HomeScreen,
        keyLabel: 'Home',
        Icon: <Ionicons name="home" size={scale(24)} color={colors.gray_D3D1D8} />,
        IconFocused: (<Ionicons name="home" size={scale(24)} color={colors.orange_FE724C} />),
        component: HomeScreen,
    },
    {
        id: 2,
        name: routes.SearchScreen,
        keyLabel: 'Search',
        Icon: <Ionicons name="search" size={scale(26)} color={colors.gray_D3D1D8} />,
        IconFocused: <Ionicons name="search" size={scale(26)} color={colors.orange_FE724C} />,
        component: SearchScreen,
    },
    {
        id: 3,
        name: routes.CartScreen,
        keyLabel: 'Cart',
        Icon: <Ionicons name="cart" size={scale(26)} color={colors.gray_D3D1D8} />,
        IconFocused: <Ionicons name="cart" size={scale(26)} color={colors.orange_FE724C} />,
        component: CartScreen,
    },
    {
        id: 4,
        name: routes.FavoriteScreen,
        keyLabel: 'Heart',
        Icon: <Ionicons name="heart" size={scale(26)} color={colors.gray_D3D1D8} />,
        IconFocused: <Ionicons name="heart" size={scale(26)} color={colors.orange_FE724C} />,
        component: FavoriteScreen,
    },
    {
        id: 5,
        name: routes.NotificationScreen,
        keyLabel: 'Notification',
        Icon: <Ionicons name="notifications" size={scale(26)} color={colors.gray_D3D1D8} />,
        IconFocused: <Ionicons name="notifications" size={scale(26)} color={colors.orange_FE724C} />,
        component: NotificationScreen,
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    vwScreen: {
        flexGrow: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: colors.white,
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    disable: {
        position: 'absolute',
        top: scale(100),
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    tabBarStyle: {
        position: 'absolute',
        height: hScale(72),
        paddingBottom: 0,
    },
    stBorderRadius: {
        borderRadius: radius.radius14,
    },
    stBorderLeftRadius: {
        borderBottomLeftRadius: radius.radius14,
    },

    containerViewTab: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vwIconViewTab: {
        width: scale(28),
        height: scale(28),
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Platform.OS === 'ios' ? 0 : scale(2),
    },
    badge: {
        width: wScale(16),
        height: wScale(16),
        borderRadius: radius.radius6,
        backgroundColor: colors.orange_FE724C,
        position: 'absolute',
        top: -scale(12),
        right: -scale(8),
        justifyContent: 'center',
        alignItems: 'center',
    },
    counter: {
        fontSize: fontSize.fontSize11,
        color: colors.white,
    },
});

export default BottomTabNavigator;
