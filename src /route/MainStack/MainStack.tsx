import React from 'react';

import {MainStackProps} from '../types';

import routesTitle from '../routesTitle';
import RoutesNames from '../routesNames';
import MainScreen from '../../screens/MainScreen';
import {createStackNavigator} from '@react-navigation/stack';

const MainStackNavigator = createStackNavigator<MainStackProps>();

const MainStack = () => (
  <MainStackNavigator.Navigator
    screenOptions={({route}) => ({
      ...routesTitle(route),
    })}>
    <MainStackNavigator.Screen
      component={MainScreen}
      name={RoutesNames.MAIN_SCREEN}
    />
  </MainStackNavigator.Navigator>
);

export default MainStack;
