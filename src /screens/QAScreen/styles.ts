import {StyleSheet} from 'react-native';

import {StyleGuide} from '../../components/mainStyles';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils';

export default StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    zIndex: 2,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  blurView: {
    position: 'absolute',
    zIndex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  backGroundImage: {
    position: 'absolute',
    zIndex: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: StyleGuide.mainColors.primary_08,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: StyleGuide.mainColors.circleTab,
  },
  buttonImage: {
    width: 24,
    height: 24,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 80,
  },
  qaImage: {
    width: 148,
    height: 148,
  },
  authorTextWrapper: {
    marginBottom: 24,
  },
  ratingRow: {
    flexDirection: 'row',
  },
  rating: {
    color: StyleGuide.mainColors.base_white,
    ...StyleGuide.typography.BODY_SEMI_BOLD_14,
  },
  ratingImage: {
    width: 7,
    height: 7,
  },
  textRow: {
    flexDirection: 'row',
  },
  name: {
    color: StyleGuide.mainColors.base_white,
    ...StyleGuide.typography.BODY_SEMI_BOLD_14,
  },
  verificationImage: {
    marginLeft: 8,
    width: 16,
    height: 16,
  },
  work: {
    color: StyleGuide.mainColors.base_02,
    ...StyleGuide.typography.BODY_REGULAR_14,
  },
  questionTextWrapper: {
    marginBottom: 24,
  },
  questionText: {
    color: StyleGuide.mainColors.base_white,
    ...StyleGuide.typography.TITLE_2,
  },
  subContentWrapper: {},
  heartButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  play: {
    marginTop: 32,
  },
});
