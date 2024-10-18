import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@assets/images/splash.png')}
                resizeMode="cover"
                style={styles.imgBg}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgBg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SplashScreen;
