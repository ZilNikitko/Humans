import {StyleSheet} from 'react-native';
import {StyleGuide} from '../mainStyles';

export default StyleSheet.create({
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: -8,
    width: 32,
    height: 32,
  },
  seeAllButton: {
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: StyleGuide.mainColors.circleTab,
    justifyContent: 'center',
    marginLeft: -8,
    width: 32,
    height: 32,
  },
  buttonText: {
    color: StyleGuide.mainColors.base_white,
    ...StyleGuide.typography.CAPTION_REGULAR_12,
  },
});
