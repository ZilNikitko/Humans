import {StyleSheet} from 'react-native';

import {StyleGuide} from '../mainStyles';

export default StyleSheet.create({
  timerWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  timeText: {
    color: StyleGuide.mainColors.base_white,
    ...StyleGuide.typography.CAPTION_12,
  },
});
