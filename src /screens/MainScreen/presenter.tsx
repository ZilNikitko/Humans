import React, {
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from 'react-native';
import Animated, {
  AnimatedStyleProp,
  runOnJS,
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
  HumansType,
  HumansShortType,
  CategoryButtonType,
} from '../../lib/apiTypes';
import {
  CATEGORY_MOCK_DATA,
  RECENTLY_MOCK_DATA,
  NEW_HUMANS_MOCK_DATA,
  ALL_EXPERT_MOCK_DATA,
  BEST_MATCHES_MOCK_DATA,
} from '../../lib/Api';

import styles from './styles';

const TEXT_DURATION: number = 1000;
const DELAY: number = 500;
const DURATION: number = 300;
const HEADER_TEXT_INITIAL_HEIGHT: number = 82;
const HEADER_TEXT_INITIAL_MARGIN: number = 40;

const HEADER_TITLE_TEXT = [
  'Meet your',
  'recommended humans',
  'Find Humans and book your first consultation',
];

const Presenter = ({}) => {
  const firstTextOpacity = useSharedValue<number>(0);
  const secondTextOpacity = useSharedValue<number>(0);
  const thirdTextOpacity = useSharedValue<number>(0);
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const headerTextOpacity = useSharedValue<number>(1);
  const headerTextHeight = useSharedValue<number>(HEADER_TEXT_INITIAL_HEIGHT);
  const headerTextMargin = useSharedValue<number>(HEADER_TEXT_INITIAL_MARGIN);
  const firstRenderScreen: MutableRefObject<boolean> = useRef<boolean>(true);

  const isInitialCategory: boolean = useMemo(
    () => currentCategory === 0,
    [currentCategory],
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
    headerTextOpacity.value = withTiming(isInitialCategory ? 1 : 0, {
      duration: DURATION,
    });
    headerTextHeight.value = withTiming(
      isInitialCategory ? HEADER_TEXT_INITIAL_HEIGHT : 0,
      {duration: DURATION},
    );
    headerTextMargin.value = withTiming(
      isInitialCategory ? HEADER_TEXT_INITIAL_MARGIN : 0,
      {duration: DURATION},
    );
  }, [isInitialCategory]);

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
        <Animated.View style={[headerTextAnimatedStyle]}>
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
      <ScrollView
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
              columnWrapperStyle={styles.flatListColumn}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaViewOS>
  );
};

export default Presenter;
