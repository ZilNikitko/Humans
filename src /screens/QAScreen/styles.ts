import {StyleSheet} from 'react-native';
import {StyleGuide} from '../../components/mainStyles';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../lib/utils';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
    zIndex: 2,
  },
  headerWrapper: {
    zIndex: 2,
    marginTop: 16,
    marginHorizontal: 16,
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
  },
  pageButtonRight: {
    height: '100%',
    width: 25,
    marginHorizontal: -16,
    position: 'absolute',
    zIndex: 3,
    borderWidth: 1,
    right: 0,
  },
  pageButtonLeft: {
    height: '100%',
    width: 25,
    marginHorizontal: -16,
    position: 'absolute',
    zIndex: 3,
    borderWidth: 1,
    left: 0,
    borderColor: 'red',
  },
});
