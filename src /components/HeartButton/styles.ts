import {StyleSheet} from 'react-native';
import {StyleGuide} from '../mainStyles';

export default StyleSheet.create({
  heartButton: {
    width: 32,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 32,
  },
  likesCountWrapper: {
    position: 'absolute',
    bottom: 0,
  },
  likesCountText: {
    textAlign: 'center',
    color: StyleGuide.mainColors.base_white,
    ...StyleGuide.typography.CAPTION_REGULAR_12,
  },
});
