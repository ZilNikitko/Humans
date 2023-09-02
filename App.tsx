import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AppNavigator from './src /route/AppNavigator';

const App = (): ReactNode => (
  <GestureHandlerRootView style={styles.gestureHandlerRootView}>
    <AppNavigator />
  </GestureHandlerRootView>
);

export default App;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
