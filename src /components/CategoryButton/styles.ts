import {StyleSheet} from 'react-native';
import {StyleGuide} from '../mainStyles';

export default StyleSheet.create({
  mainWrapper: {
    paddingBottom: 16,
    width: 95,
    borderBottomWidth: 2,
  },
  activeBorder: {
    borderBottomColor: StyleGuide.mainColors.primary,
  },
  buttonTitle: {
    textAlign: 'center',
    color: StyleGuide.mainColors.base_04,
    ...StyleGuide.typography.BODY_MEDIUM_16,
  },
});
