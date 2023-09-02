import React from 'react';
import {MainStackProps} from '../types';
import MainStack from '../MainStack/MainStack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

const AppNavigator = () => {
  const navigationRef = useNavigationContainerRef<MainStackProps>();
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
