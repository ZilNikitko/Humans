import {StyleSheet} from 'react-native';
import {StyleGuide} from '../mainStyles';

export default StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    height: 148,
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
  workWrapper: {
    width: '80%',
  },
  work: {
    color: StyleGuide.mainColors.base_02,
    ...StyleGuide.typography.BODY_REGULAR_14,
  },
  questionTextWrapper: {
    width: '80%',
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
  pageButton: {
    height: '100%',
    width: 40,
    marginHorizontal: -16,
    position: 'absolute',
    right: 0,
  },
  pageButtonLeft: {
    left: 0,
  },
});
