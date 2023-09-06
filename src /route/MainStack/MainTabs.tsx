import React, {useCallback, ReactNode, ReactElement, useEffect} from 'react';
import {ImageSourcePropType, ImageStyle} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import {TransitionPresets} from '@react-navigation/stack';
import {
  BottomTabBar,
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';
import type {
  EventArg,
  RouteProp,
} from '@react-navigation/core/lib/typescript/src/types';
import Animated, {
  AnimatedStyleProp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import RouteNames from '../routesNames';
import type {TabBarProps} from '../types';
import styles from './styles/mainTabsStyles';
import QAScreen from '../../screens/QAScreen';
import MainScreen from '../../screens/MainScreen';
import {StyleGuide} from '../../components/mainStyles';
import MessageScreen from '../../screens/MessageScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import SafeAreaViewOS from '../../components/SafeAreaViewOS';
import {AVATAR, HOME, NOTIFICATIONS, SETTINGS} from '../../../static';

const TabNavigator = createBottomTabNavigator<TabBarProps>();

const FOCUS_TAB_DIMENSION: number = 28;
const UN_FOCUS_TAB_DIMENSION: number = 24;

export function MainTabs() {
  const tabWidth = useSharedValue<number>(UN_FOCUS_TAB_DIMENSION);
  const tabHeight = useSharedValue<number>(UN_FOCUS_TAB_DIMENSION);

  const imageSizeAnimatedStyle: AnimatedStyleProp<ImageStyle> =
    useAnimatedStyle(
      (): ImageStyle => ({
        width: tabWidth.value,
        height: tabHeight.value,
      }),
    );

  useEffect(() => {
    tabWidth.value = withTiming(FOCUS_TAB_DIMENSION, {duration: 300});
    tabHeight.value = withTiming(FOCUS_TAB_DIMENSION, {duration: 300});
  }, []);

  const onPressTab = useCallback(
    (
      e: EventArg<Extract<'tabPress', string>, any, any>,
      screenType: RouteNames,
    ): void => {
      switch (screenType) {
        case RouteNames.MAIN_SCREEN:
          break;
        case RouteNames.QA_SCREEN:
          break;
        case RouteNames.MESSAGE_SCREEN:
          break;
        case RouteNames.PROFILE_SCREEN:
          break;
        default:
          break;
      }
    },
    [],
  );

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
        <Animated.Image
          source={iconName}
          style={[
            iconName === AVATAR && styles.tabBarAvatar,
            iconName !== AVATAR && styles.tabBarIcon,
            focused && iconName !== AVATAR && styles.tabBarIconActive,
            focused && imageSizeAnimatedStyle,
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
          blurAmount={15}
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
          listeners={{
            tabPress: (
              e: EventArg<Extract<'tabPress', string>, any, any>,
            ): void => onPressTab(e, RouteNames.MAIN_SCREEN),
          }}
        />
        <TabNavigator.Screen
          component={QAScreen}
          name={RouteNames.QA_SCREEN}
          listeners={{
            tabPress: (
              e: EventArg<Extract<'tabPress', string>, any, any>,
            ): void => onPressTab(e, RouteNames.QA_SCREEN),
          }}
        />
        <TabNavigator.Screen
          component={MessageScreen}
          name={RouteNames.MESSAGE_SCREEN}
          listeners={{
            tabPress: (
              e: EventArg<Extract<'tabPress', string>, any, any>,
            ): void => onPressTab(e, RouteNames.MESSAGE_SCREEN),
          }}
        />
        <TabNavigator.Screen
          component={ProfileScreen}
          name={RouteNames.PROFILE_SCREEN}
          listeners={{
            tabPress: (
              e: EventArg<Extract<'tabPress', string>, any, any>,
            ): void => onPressTab(e, RouteNames.PROFILE_SCREEN),
          }}
        />
      </TabNavigator.Navigator>
    </React.Fragment>
  );
}
