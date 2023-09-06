import {StyleSheet} from 'react-native';

import {StyleGuide} from '../../../components/mainStyles';

export default StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 97,
    backgroundColor: StyleGuide.mainColors.tabBar,
  },
  tabBarAvatar: {
    width: 28,
    height: 28,
  },
  tabBarIcon: {
    width: 24,
    height: 24,
    tintColor: StyleGuide.mainColors.base_02,
  },
  tabBarIconActive: {
    width: 28,
    height: 28,
    tintColor: StyleGuide.mainColors.base_04,
  },
  blurView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 97,
  },
});
