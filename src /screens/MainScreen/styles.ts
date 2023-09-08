import {StyleSheet} from 'react-native';

import {StyleGuide} from '../../components/mainStyles';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: StyleGuide.mainColors.background,
  },
  scrollView: {
    flex: 1,
  },
  headerContentWrapper: {
    paddingHorizontal: 16,
  },
  text: {
    color: StyleGuide.mainColors.primary,
    ...StyleGuide.typography.CAPTION_12,
  },
  headerWrapper: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 48,
    height: 48,
  },
  headerImage: {
    width: 24,
    height: 24,
  },
  headerCalendarImage: {
    marginLeft: 16,
  },
  headerTextWrapper: {
    marginLeft: 8,
    flexDirection: 'row',
  },
  headerText: {
    color: StyleGuide.mainColors.base_02,
    ...StyleGuide.typography.BODY_REGULAR_16,
  },
  headerName: {
    color: StyleGuide.mainColors.primary_08,
    ...StyleGuide.typography.BODY_REGULAR_16,
  },
  title: {
    color: StyleGuide.mainColors.primary_08,
    ...StyleGuide.typography.TITLE_1,
  },
  subTitle: {
    color: StyleGuide.mainColors.base_03,
    ...StyleGuide.typography.BODY_REGULAR_14,
  },
  categoryWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: StyleGuide.mainColors.base_white,
  },
  newHumansWrapper: {
    marginTop: 24,
  },
  flatListTextWrapper: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizontalScrollTitle: {
    color: StyleGuide.mainColors.base_04,
    ...StyleGuide.typography.TITLE_2,
  },
  seeAllButton: {
    flexDirection: 'row',
    marginTop: 2,
  },
  seeAllText: {
    color: StyleGuide.mainColors.base_03,
    ...StyleGuide.typography.CAPTION_12,
  },
  arrowRight: {
    width: 16,
    height: 16,
  },
  horizontalScroll: {
    marginTop: 16,
  },
  humanCard: {
    marginLeft: 8,
  },
  humanCardColumn: {
    marginLeft: 12,
    marginBottom: 12,
  },
  humanSmallCard: {
    marginLeft: 24,
  },
  firstItem: {
    marginLeft: 16,
  },
  lastItem: {
    marginRight: 16,
  },
  flatListWrapper: {
    marginTop: 40,
  },
  flatListColumn: {
    marginHorizontal: 12,
  },
  footerComponent: {
    height: 97,
    backgroundColor: StyleGuide.mainColors.transparent,
  },
});
