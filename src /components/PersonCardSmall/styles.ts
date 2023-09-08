import {StyleSheet} from 'react-native';

import {StyleGuide} from '../mainStyles';

export default StyleSheet.create({
  mainWrapper: {
    width: 90,
    height: 144,
  },
  avatarImage: {
    width: 90,
    height: 90,
  },
  textWrapper: {
    marginTop: 15,
  },
  name: {
    textAlign: 'center',
    color: StyleGuide.mainColors.base_04,
    ...StyleGuide.typography.BODY_SEMI_BOLD_14,
  },
  work: {
    textAlign: 'center',
    color: StyleGuide.mainColors.base_03,
    ...StyleGuide.typography.CAPTION_12,
  },
});
