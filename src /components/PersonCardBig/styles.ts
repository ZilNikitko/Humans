import {StyleSheet} from 'react-native';
import {StyleGuide} from '../mainStyles';

export default StyleSheet.create({
  mainWrapper: {
    width: 166,
    height: 280,
    borderRadius: 12,
    backgroundColor: StyleGuide.mainColors.primary_08,
    justifyContent: 'flex-end',
  },
  mainWrapperLarge: {
    width: 300,
    height: 420,
  },
  backGroundImage: {
    borderRadius: 12,
  },
  backGroundImageWrapper: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
  },
  ratingRow: {
    zIndex: 2,
    position: 'absolute',
    top: 16,
    left: 8,
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
  infoContent: {
    position: 'absolute',
    bottom: 16,
    left: 8,
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
  price: {
    color: StyleGuide.mainColors.base_white,
    ...StyleGuide.typography.BODY_REGULAR_14,
  },
});
