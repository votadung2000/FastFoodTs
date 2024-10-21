import React from 'react';
import { StyleSheet } from 'react-native';
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';

import { AppContainer } from '@navigators';
import store from '@store';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.gesView}>
        <NotifierWrapper>
          <MenuProvider>
            <AppContainer />
          </MenuProvider>
        </NotifierWrapper>
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  gesView: {
    flex: 1,
  },
});

export default App;
