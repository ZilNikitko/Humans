import {StyleSheet} from 'react-native';

import {StyleGuide} from '../../../components/mainStyles';

export default StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 97,
    borderTopWidth: 0,
    backgroundColor: StyleGuide.mainColors.transparent,
  },
  tabBarAvatar: {
    width: 28,
    height: 28,
    marginTop: 42.5,
  },
  tabBarIcon: {
    width: 24,
    height: 24,
    tintColor: StyleGuide.mainColors.base_02,
    marginTop: 42.5,
  },
  tabBarIconActive: {
    width: 28,
    height: 28,
    tintColor: StyleGuide.mainColors.base_04,
  },
  canvas: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
