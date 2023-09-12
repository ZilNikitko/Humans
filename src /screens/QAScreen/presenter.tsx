import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import Animated, {useSharedValue} from 'react-native-reanimated';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

import {QA_DATA} from '../../lib/Api';
import {SCREEN_WIDTH} from '../../lib/utils';
import QAPage from '../../components/QAPage';
import type {DataQAType} from '../../lib/apiTypes';
import {CHEVRON_DOWN, DOTS, QA_AVATAR} from '../../../static';

import styles from './styles';

const INITIAL_PAGE: number = 0;
const PARALLAX_SCROLLING_SCALE: number = 1;
const PARALLAX_SCROLLING_OFFSET: number = 170;

const ImageBackgroundAnimatedComponent =
  Animated.createAnimatedComponent(ImageBackground);

const Presenter = ({onPressGoBack, imageArray}: Props) => {
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState(
    imageArray ? imageArray[INITIAL_PAGE] : [],
  );
  const carouselRef = useRef<ICarouselInstance | null>();
  const progressValue = useSharedValue<number>(0);
  const [currentPagerIndex, setCurrentPagerIndex] =
    useState<number>(INITIAL_PAGE);

  const prevPagerIndex = useRef<number>(currentPagerIndex);

  useEffect(() => {
    prevPagerIndex.current = currentPagerIndex;
  }, [currentPagerIndex]);

  const onPageSelected = useCallback(
    (index: number): void => {
      if (index || index === 0) {
        setCurrentPagerIndex(index);
      }
    },
    [currentPagerIndex],
  );

  const goToNextPage = useCallback((): void => {
    carouselRef?.current?.next();
  }, []);

  const goToPreviousPage = useCallback((): void => {
    carouselRef?.current?.prev();
  }, []);

  useEffect(() => {
    if (scrolling && imageArray) {
      setBackgroundImage(imageArray[currentPagerIndex + 1]);
    }
  }, [scrolling]);

  const onProgressChange = useCallback(
    (_: number, absoluteProgress?: number) => {
      if (absoluteProgress) {
        absoluteProgress % 1 !== 0 ? setScrolling(true) : setScrolling(false);
        return (progressValue.value = absoluteProgress);
      }
    },
    [],
  );

  const renderCarouselItem = useCallback(
    ({item, index}: {item: DataQAType; index: number}) => (
      <QAPage
        progress={progressValue}
        handleOnPressNextPage={goToNextPage}
        handleOnPressPreviousPage={goToPreviousPage}
        currentPagerIndex={currentPagerIndex}
        index={index}
        name={item?.name}
        work={item?.work}
        rating={item?.rating}
        key={`qa_page_${index}`}
        question={item?.question}
        userCount={item?.userCount}
        roundImage={item?.roundImage}
        likesCount={item?.likesCount}
        audioDuration={item?.audioDuration}
      />
    ),
    [currentPagerIndex],
  );

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
        source={imageArray ? backgroundImage : QA_AVATAR}
        style={[styles.backGroundImage]}
      />
      <BlurView blurType="dark" blurAmount={50} style={styles.blurView} />
      <View style={styles.carouselWrapper}>
        <Carousel
          // @ts-ignore
          ref={carouselRef}
          onScrollEnd={onPageSelected}
          data={QA_DATA}
          renderItem={renderCarouselItem}
          width={SCREEN_WIDTH}
          style={styles.carousel}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: PARALLAX_SCROLLING_SCALE,
            parallaxScrollingOffset: PARALLAX_SCROLLING_OFFSET,
          }}
          onProgressChange={onProgressChange}
        />
      </View>
    </SafeAreaView>
  );
};

export default Presenter;

interface Props {
  imageArray?: Array<ImageSourcePropType>;
  onPressGoBack?: () => void;
}
