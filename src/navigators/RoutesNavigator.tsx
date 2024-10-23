import React from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import { userSelector } from '@reducers';
import { colors } from '@constants';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RoutesNavigator = () => {
    const user = useSelector(userSelector);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar
                    animated
                    // translucent
                    barStyle="dark-content"
                    backgroundColor={colors.white}
                />
                {user && user?.id
                    ? <MainNavigator />
                    : <AuthNavigator />}
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
});

export default RoutesNavigator;
