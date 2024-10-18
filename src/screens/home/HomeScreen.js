import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
// import React, {useRef, useCallback} from 'react';
// import {View, Animated} from 'react-native';
// import {observer} from 'mobx-react';
// import {useFocusEffect} from '@react-navigation/native';

// import {useStore} from '@context';
// import {hScale, scale} from '@resolutions';
// import {Location} from '@components';

// import {Products, Menu, Header} from './components';
// import styles from './styles';

// const HomeScreen = () => {
//   const animatedValue = useRef(new Animated.Value(0)).current;

//   const {
//     categoryStore: {fetchCombineApiCategories},
//     productsStore: {clearFilterPr},
//     deliveryAddressStore: {fetchApiCurrentAddress},
//     animatedMenuStore: {isShowMenu},
//   } = useStore();

//   useFocusEffect(
//     useCallback(() => {
//       fetchCombineApiCategories();
//       fetchApiCurrentAddress();

//       return () => {
//         clearFilterPr();
//       };
//     }, []),
//   );

//   const titleHeaderAnimation = {
//     transform: [
//       {
//         scaleX: animatedValue.interpolate({
//           inputRange: [0, 50],
//           outputRange: [1, 0],
//           extrapolate: 'clamp',
//         }),
//       },
//       {
//         translateX: animatedValue.interpolate({
//           inputRange: [0, 25],
//           outputRange: [0, -100],
//           extrapolate: 'clamp',
//         }),
//       },
//     ],
//     opacity: animatedValue.interpolate({
//       inputRange: [0, 25],
//       outputRange: [1, 0],
//       extrapolate: 'clamp',
//     }),
//     height: animatedValue.interpolate({
//       inputRange: [0, hScale(80)],
//       outputRange: [hScale(80), 0],
//       extrapolate: 'clamp',
//     }),
//     marginTop: animatedValue.interpolate({
//       inputRange: [0, scale(28)],
//       outputRange: [scale(28), 0],
//       extrapolate: 'clamp',
//     }),
//   };

//   return (
//     <View style={[styles.layout, isShowMenu && styles.stBorderRadius]}>
//       <View style={styles.container}>
//         <Header titleHeaderAnimation={titleHeaderAnimation} />
//         <Menu />
//         <Products animatedValue={animatedValue} />
//       </View>
//       <Location />
//     </View>
//   );
// };

// export default observer(HomeScreen);
