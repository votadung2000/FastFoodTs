import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotificationScreen = () => {
  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})
// import React from 'react';
// import {StyleSheet, View} from 'react-native';

// import {Text} from '@components';
// import {colors, fontSize} from '@constants';
// import {scale} from '@resolutions';

// const NotificationScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text bold style={styles.title}>
//         {'Notification'}
//       </Text>
//       <View style={styles.body} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   title: {
//     fontSize: fontSize.fontSize30,
//     alignSelf: 'flex-end',
//     marginRight: scale(15),
//     marginTop: scale(20),
//   },
//   body: {},
// });

// export default NotificationScreen;
