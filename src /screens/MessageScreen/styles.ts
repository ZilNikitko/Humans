import {StyleSheet} from 'react-native';

import {StyleGuide} from '../../components/mainStyles';

export default StyleSheet.create({
  safeAreaView: {
    justifyContent: 'center',
    backgroundColor: StyleGuide.mainColors.background,
  },
  text: {
    textAlign: 'center',
    color: StyleGuide.mainColors.base_03,
    ...StyleGuide.typography.TITLE_1,
  },
});
