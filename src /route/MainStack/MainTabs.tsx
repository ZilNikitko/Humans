import React, {ReactElement, ReactNode, useCallback} from 'react';
import {Image, ImageSourcePropType} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import type {MainStackProps, TabBarProps} from '../types';
import {StackNavigationProp, TransitionPresets} from '@react-navigation/stack';
import type {RouteProp} from '@react-navigation/core/lib/typescript/src/types';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';
import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import RouteNames from '../routesNames';
import styles from './styles/mainTabsStyles';
import QAScreen from '../../screens/QAScreen';
import MainScreen from '../../screens/MainScreen';
import {StyleGuide} from '../../components/mainStyles';
import MessageScreen from '../../screens/MessageScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SafeAreaViewOS from '../../components/SafeAreaViewOS';
import {AVATAR, HOME, NOTIFICATIONS, SETTINGS} from '../../../static';

const TabNavigator = createBottomTabNavigator<TabBarProps>();

export function MainTabs() {
  const navigation = useNavigation<StackNavigationProp<MainStackProps>>();

  const tabBarIcon = useCallback(
    ({
      route,
      focused,
    }: {
      route: RouteProp<TabBarProps, keyof TabBarProps>;
      focused: boolean;
    }): ReactNode => {
      let iconName: ImageSourcePropType;

      switch (route.name) {
        case RouteNames.MAIN_SCREEN:
          iconName = HOME;
          break;
        case RouteNames.QA_SCREEN:
          iconName = SETTINGS;
          break;
        case RouteNames.MESSAGE_SCREEN:
          iconName = NOTIFICATIONS;
          break;
        case RouteNames.PROFILE_SCREEN:
          iconName = AVATAR;
          break;
        default:
          iconName = HOME;
      }

      return (
        <Image
          source={iconName}
          style={[
            iconName === AVATAR && styles.tabBarAvatar,
            iconName !== AVATAR && styles.tabBarIcon,
            focused && iconName !== AVATAR && styles.tabBarIconActive,
          ]}
        />
      );
    },
    [],
  );

  const CustomBottomTabBar = useCallback(
    (props: BottomTabBarProps): ReactElement => (
      <React.Fragment>
        <BlurView
          blurType="light"
          blurAmount={30}
          reducedTransparencyFallbackColor={StyleGuide.mainColors.base_white}
          style={styles.blurView}
        />
        <BottomTabBar {...props} />
      </React.Fragment>
    ),
    [],
  );

  return (
    <React.Fragment>
      <SafeAreaViewOS
        style={{backgroundColor: StyleGuide.mainColors.background}}
        isHeader
      />
      <TabNavigator.Navigator
        tabBar={(props: BottomTabBarProps): ReactElement => (
          <CustomBottomTabBar {...props} />
        )}
        initialRouteName={RouteNames.MAIN_SCREEN}
        screenOptions={({
          route,
        }: {
          route: RouteProp<TabBarProps, keyof TabBarProps>;
          navigation: any;
        }): BottomTabNavigationOptions => ({
          tabBarIcon: ({focused}: {focused: boolean}): ReactNode =>
            tabBarIcon({route, focused}),
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        })}>
        <TabNavigator.Screen
          component={MainScreen}
          name={RouteNames.MAIN_SCREEN}
        />
        <TabNavigator.Screen
          component={QAScreen}
          name={RouteNames.QA_SCREEN}
          listeners={{
            tabPress: (e): void => {
              navigation.navigate(RouteNames.QA_SCREEN);
              e.preventDefault();
            },
          }}
        />
        <TabNavigator.Screen
          component={MessageScreen}
          name={RouteNames.MESSAGE_SCREEN}
        />
        <TabNavigator.Screen
          component={ProfileScreen}
          name={RouteNames.PROFILE_SCREEN}
        />
      </TabNavigator.Navigator>
    </React.Fragment>
  );
}
