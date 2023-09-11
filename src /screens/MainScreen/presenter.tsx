import React, {
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  AnimatedStyleProp,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import PersonCardBig from '../../components/PersonCardBig';
import SafeAreaViewOS from '../../components/SafeAreaViewOS';
import CategoryButton from '../../components/CategoryButton';
import PersonCardSmall from '../../components/PersonCardSmall';
import {ARROW_RIGHT, AVATAR, CALENDAR, STAR} from '../../../static';
import type {
  CategoryButtonType,
  HumansShortType,
  HumansType,
} from '../../lib/apiTypes';
import {
  ALL_EXPERT_MOCK_DATA,
  BEST_MATCHES_MOCK_DATA,
  CATEGORY_MOCK_DATA,
  NEW_HUMANS_MOCK_DATA,
  RECENTLY_MOCK_DATA,
} from '../../lib/Api';

import styles from './styles';

const DELAY: number = 500;
const DURATION: number = 300;
const TEXT_DURATION: number = 1000;
const HEADER_TEXT_INITIAL_HEIGHT: number = 82;
const HEADER_TEXT_INITIAL_MARGIN: number = 40;

const HEADER_TITLE_TEXT = [
  'Meet your',
  'recommended humans',
  'Find Humans and book your first consultation',
];

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const range = [0, 100];

const Presenter = ({}) => {
  const firstTextOpacity = useSharedValue<number>(0);
  const secondTextOpacity = useSharedValue<number>(0);
  const thirdTextOpacity = useSharedValue<number>(0);
  const headerTextOpacity = useSharedValue<number>(1);
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const headerTextHeight = useSharedValue<number>(HEADER_TEXT_INITIAL_HEIGHT);
  const headerTextMargin = useSharedValue<number>(HEADER_TEXT_INITIAL_MARGIN);
  const [isCategoryPressed, setCategoryPressed] = useState<boolean>(false);
  const firstRenderScreen: MutableRefObject<boolean> = useRef<boolean>(true);

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const headerTextScrollAnimatedStyle: AnimatedStyleProp<ViewStyle> =
    useAnimatedStyle(
      (): ViewStyle => ({
        height: interpolate(
          translationY.value,
          range,
          [HEADER_TEXT_INITIAL_HEIGHT, 0],
          Extrapolation.CLAMP,
        ),
        opacity: interpolate(
          translationY.value,
          [0, 100],
          [1, 0],
          Extrapolation.CLAMP,
        ),
        marginBottom: interpolate(
          translationY.value,
          [0, 100],
          [HEADER_TEXT_INITIAL_MARGIN, 0],
          Extrapolation.CLAMP,
        ),
      }),
    );

  const headerTextAnimatedStyle: AnimatedStyleProp<ViewStyle> =
    useAnimatedStyle(
      (): ViewStyle => ({
        height: headerTextHeight.value,
        opacity: headerTextOpacity.value,
        marginBottom: headerTextMargin.value,
      }),
    );

  const onFirstRenderEnd = useCallback(() => {
    firstRenderScreen.current = false;
  }, []);

  useEffect((): void => {
    headerTextOpacity.value = withTiming(!isCategoryPressed ? 1 : 0, {
      duration: DURATION,
    });
    headerTextHeight.value = withTiming(
      !isCategoryPressed ? HEADER_TEXT_INITIAL_HEIGHT : 0,
      {duration: DURATION},
    );
    headerTextMargin.value = withTiming(
      !isCategoryPressed ? HEADER_TEXT_INITIAL_MARGIN : 0,
      {duration: DURATION},
    );
  }, [isCategoryPressed]);

  useEffect((): void => {
    if (firstRenderScreen.current) {
      firstTextOpacity.value = withDelay(
        0,
        withTiming(1, {duration: TEXT_DURATION}),
      );
      secondTextOpacity.value = withDelay(
        DELAY,
        withTiming(1, {duration: TEXT_DURATION}),
      );
      thirdTextOpacity.value = withDelay(
        2 * DELAY,
        withTiming(1, {duration: TEXT_DURATION}, () => {
          runOnJS(onFirstRenderEnd)();
        }),
      );
    }
  }, [firstRenderScreen]);

  const onPressCategoryButton = useCallback(
    (index: number): void => {
      setCurrentCategory(index);
      setCategoryPressed(true);
    },
    [currentCategory],
  );

  const renderCategory = useCallback(
    ({
      item,
      index,
    }: {
      item: CategoryButtonType;
      index: number;
    }): ReactElement => (
      <CategoryButton
        index={index}
        handleOnPress={(): void => onPressCategoryButton(index)}
        title={item?.title}
        isActive={currentCategory === index}
        key={`category_filter_${index}`}
      />
    ),
    [currentCategory],
  );

  const renderNewHumans = useCallback(
    ({item, index}: {item: HumansType; index: number}): ReactElement => (
      <PersonCardBig
        personImage={item?.personImage}
        isLargeCard={false}
        style={[
          styles.humanCard,
          index === 0 && styles.firstItem,
          index === NEW_HUMANS_MOCK_DATA?.length - 1 && styles.lastItem,
        ]}
        rating={item?.rating}
        name={item?.name}
        work={item?.work}
        amount={item?.amount}
        workType={item?.workType}
        key={`new_humans_card_${index}`}
      />
    ),
    [],
  );

  const renderRecentlyHumans = useCallback(
    ({item, index}: {item: HumansShortType; index: number}): ReactElement => (
      <PersonCardSmall
        style={[
          styles.humanSmallCard,
          index === 0 && styles.firstItem,
          index === NEW_HUMANS_MOCK_DATA?.length && styles.lastItem,
        ]}
        avatar={item?.avatar}
        name={item?.name}
        work={item?.work}
        key={`recently_card_${index}`}
      />
    ),
    [],
  );

  const renderBestMatches = useCallback(
    ({item, index}: {item: HumansType; index: number}): ReactElement => (
      <PersonCardBig
        personImage={item?.personImage}
        style={[
          styles.humanCard,
          index === 0 && styles.firstItem,
          index === NEW_HUMANS_MOCK_DATA?.length - 1 && styles.lastItem,
        ]}
        rating={item?.rating}
        name={item?.name}
        work={item?.work}
        amount={item?.amount}
        workType={item?.workType}
        key={`best_matches_card_${index}`}
      />
    ),
    [],
  );

  const renderAllExperts = useCallback(
    ({item, index}: {item: HumansType; index: number}): ReactElement => (
      <PersonCardBig
        personImage={item?.personImage}
        isLargeCard={false}
        style={styles.humanCardColumn}
        rating={item?.rating}
        name={item?.name}
        work={item?.work}
        amount={item?.amount}
        workType={item?.workType}
        key={`all_experts_card_${index}`}
      />
    ),
    [],
  );

  const listFooterComponent = useCallback(
    () => <View style={styles.footerComponent} />,
    [],
  );

  return (
    <SafeAreaViewOS style={styles.safeAreaView}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContentWrapper}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerContent}>
            <Image style={styles.headerAvatar} source={AVATAR} />
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>Welcome, </Text>
              <Text style={styles.headerName}>Alexander!</Text>
            </View>
          </View>
          <View style={styles.headerContent}>
            <Image style={styles.headerImage} source={STAR} />
            <Image
              style={[styles.headerImage, styles.headerCalendarImage]}
              source={CALENDAR}
            />
          </View>
        </View>
        <Animated.View
          style={[
            isCategoryPressed
              ? headerTextAnimatedStyle
              : headerTextScrollAnimatedStyle,
          ]}>
          <Animated.Text
            style={[
              styles.title,
              {opacity: firstTextOpacity},
            ]}>{`${HEADER_TITLE_TEXT[0]}`}</Animated.Text>
          <Animated.Text
            style={[
              styles.title,
              {opacity: secondTextOpacity},
            ]}>{`${HEADER_TITLE_TEXT[1]}`}</Animated.Text>
          <Animated.Text
            style={[
              styles.subTitle,
              {opacity: thirdTextOpacity},
            ]}>{`${HEADER_TITLE_TEXT[2]}`}</Animated.Text>
        </Animated.View>
      </View>
      <View style={styles.categoryWrapper}>
        <FlatList
          data={CATEGORY_MOCK_DATA}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <AnimatedScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.newHumansWrapper}>
          <View style={styles.flatListTextWrapper}>
            <Text style={styles.horizontalScrollTitle}>New Humans</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>SEE ALL</Text>
              <Image source={ARROW_RIGHT} style={styles.arrowRight} />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalScroll}>
            <FlatList
              data={NEW_HUMANS_MOCK_DATA}
              renderItem={renderNewHumans}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.flatListWrapper}>
          <View style={styles.flatListTextWrapper}>
            <Text style={styles.horizontalScrollTitle}>Best matches</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>SEE ALL</Text>
              <Image source={ARROW_RIGHT} style={styles.arrowRight} />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalScroll}>
            <FlatList
              data={BEST_MATCHES_MOCK_DATA}
              renderItem={renderBestMatches}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.flatListWrapper}>
          <View style={styles.flatListTextWrapper}>
            <Text style={styles.horizontalScrollTitle}>Recently viewed</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>SEE ALL</Text>
              <Image source={ARROW_RIGHT} style={styles.arrowRight} />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalScroll}>
            <FlatList
              data={RECENTLY_MOCK_DATA}
              renderItem={renderRecentlyHumans}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.flatListWrapper}>
          <View style={styles.flatListTextWrapper}>
            <Text style={styles.horizontalScrollTitle}>
              All business experts
            </Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>SEE ALL</Text>
              <Image source={ARROW_RIGHT} style={styles.arrowRight} />
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalScroll}>
            <FlatList
              scrollEnabled={false}
              data={ALL_EXPERT_MOCK_DATA}
              renderItem={renderAllExperts}
              numColumns={2}
              ListFooterComponent={listFooterComponent}
              columnWrapperStyle={styles.flatListColumn}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </AnimatedScrollView>
    </SafeAreaViewOS>
  );
};

export default Presenter;
