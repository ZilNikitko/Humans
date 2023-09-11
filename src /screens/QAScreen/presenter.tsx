import React, {
  ComponentClass,
  LegacyRef,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';

import Animated, {AnimateProps, useSharedValue} from 'react-native-reanimated';
import PagerView, {
  PagerViewOnPageSelectedEvent,
  PagerViewProps,
} from 'react-native-pager-view';

import QAPage from '../../components/QAPage';
import {usePagerScrollHandler} from '../../lib/utils';

import styles from './styles';
import {QA_DATA} from '../../lib/Api';
import {DataQAType} from '../../lib/apiTypes';
import {
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  InteractionManager,
  ImageSourcePropType,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {CHEVRON_DOWN, DOTS, QA_AVATAR} from '../../../static';
import {OnPageScrollEventData} from 'react-native-pager-view/lib/typescript/PagerViewNativeComponent';

const INITIAL_PAGE: number = 0;

const AnimatedPager: ComponentClass<AnimateProps<PagerViewProps>> =
  Animated.createAnimatedComponent(PagerView);

const ImageBackgroundAnimatedComponent =
  Animated.createAnimatedComponent(ImageBackground);
type onPageScrollEventType = OnPageScrollEventData & {eventName: string};

const Presenter = ({onPressGoBack, imageArray}: Props) => {
  const offsetValue = useSharedValue<number>(0);
  const positionValue = useSharedValue<number>(INITIAL_PAGE);
  const refPagerView: LegacyRef<PagerView> = useRef(null);
  const [currentPagerIndex, setCurrentPagerIndex] =
    useState<number>(INITIAL_PAGE);

  const [lol, setLol] = useState(false);

  const onPageScroll = usePagerScrollHandler<onPageScrollEventType>(
    {
      onPageScroll: (e: onPageScrollEventType): void => {
        'worklet';
        offsetValue.value = e.offset;
        positionValue.value = e.position;
      },
    },
    'onPageScroll',
    [currentPagerIndex],
  );

  const onPageSelected = useCallback(
    (e: PagerViewOnPageSelectedEvent): void => {
      setLol(true);
      const currentIndex: number = e.nativeEvent?.position;
      if (currentIndex || currentIndex === 0) {
        setCurrentPagerIndex(currentIndex);
      }
    },
    [currentPagerIndex, lol],
  );

  const goToNextPage = useCallback((): void => {
    if (refPagerView.current && currentPagerIndex !== QA_DATA.length - 1) {
      InteractionManager.runAfterInteractions((): void => {
        refPagerView.current?.setPage(currentPagerIndex + 1);
      });
    }
  }, [currentPagerIndex]);

  const goToPreviousPage = useCallback((): void => {
    if (refPagerView.current && currentPagerIndex !== 0) {
      InteractionManager.runAfterInteractions((): void => {
        refPagerView.current?.setPage(currentPagerIndex - 1);
      });
    }
  }, [currentPagerIndex]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.headerButtonWrapper}
          onPress={onPressGoBack}>
          <Image source={CHEVRON_DOWN} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.headerButtonWrapper}>
          <Image source={DOTS} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
      <ImageBackgroundAnimatedComponent
        source={imageArray ? imageArray[currentPagerIndex] : QA_AVATAR}
        style={styles.backGroundImage}
      />
      <BlurView blurType="dark" blurAmount={50} style={styles.blurView} />
      <AnimatedPager
        ref={refPagerView}
        initialPage={INITIAL_PAGE}
        onPageSelected={onPageSelected}
        // @ts-ignore
        onPageScroll={onPageScroll}
        style={styles.pagerView}>
        {(QA_DATA ?? [])?.map(
          (item: DataQAType, index: number): ReactElement => (
            <QAPage
              handleOnPressPreviousPage={goToPreviousPage}
              handleOnPressNextPage={goToNextPage}
              index={index}
              name={item?.name}
              work={item?.work}
              offset={offsetValue}
              rating={item?.rating}
              key={`qa_page_${index}`}
              position={positionValue}
              question={item?.question}
              userCount={item?.userCount}
              roundImage={item?.roundImage}
              likesCount={item?.likesCount}
              audioDuration={item?.audioDuration}
              currentPagerIndex={currentPagerIndex}
            />
          ),
        )}
      </AnimatedPager>
    </SafeAreaView>
  );
};

export default Presenter;

interface Props {
  imageArray?: Array<ImageSourcePropType>;
  onPressGoBack?: () => void;
}
