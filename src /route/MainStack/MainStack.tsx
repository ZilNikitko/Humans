import React from 'react';

import {MainStackProps} from '../types';

import routesTitle from '../routesTitle';
import RoutesNames from '../routesNames';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {MainTabs} from './MainTabs';

const MainStackNavigator = createStackNavigator<MainStackProps>();

const MainStack = () => (
  <MainStackNavigator.Navigator
    screenOptions={({route}) => ({
      ...routesTitle(route),
    })}>
    <MainStackNavigator.Screen
      component={MainTabs}
      name={RoutesNames.TAB_NAVIGATOR}
      options={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
  </MainStackNavigator.Navigator>
);

export default MainStack;
