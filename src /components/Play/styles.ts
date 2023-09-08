import {StyleSheet} from 'react-native';

import {StyleGuide} from '../mainStyles';

export default StyleSheet.create({
  playWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainWrapper: {
    marginHorizontal: 16,
    flex: 1,
    height: 2,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: StyleGuide.mainColors.circleTab,
  },
  loadView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: StyleGuide.mainColors.primary,
  },
  timeTextWrapper: {},
  timeText: {
    color: StyleGuide.mainColors.base_white,
    ...StyleGuide.typography.CAPTION_REGULAR_12,
  },
  button: {},
  buttonImage: {
    width: 24,
    height: 24,
  },
  replyButton: {
    marginTop: 32,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: StyleGuide.mainColors.primary,
    borderRadius: 24,
    shadowColor: StyleGuide.mainColors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 2,
  },
  replyText: {
    textAlign: 'center',
    color: StyleGuide.mainColors.base_white,
    ...StyleGuide.typography.BODY_SEMI_BOLD_14,
  },
});
