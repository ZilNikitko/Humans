import React, {
  memo,
  useRef,
  useEffect,
  useCallback,
  MutableRefObject,
} from 'react';
import {
  TouchableOpacity,
  InteractionManager,
  View,
  ViewStyle,
  ImageStyle,
  StyleProp,
} from 'react-native';

import Animated, {
  withDelay,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  AnimatedStyleProp,
  DerivedValue,
  useDerivedValue,
} from 'react-native-reanimated';

import {ReText} from 'react-native-redash';
import {useSubsequentEffect} from '../../lib/utils';
import {HEART_FILLED, HEART_UNFILLED} from '../../../static';

import styles from './styles';

interface DelayTypes {
  damping: number;
  mass: number;
  stiffness: number;
}

const CONFIG: DelayTypes = {damping: 10, mass: 1, stiffness: 200};
const DURATION: number = 300;

const HeartButton = memo(
  ({
    delayIn = 0,
    delayOut = 0,
    likesCount = 0,
    isActive = false,
    onPressButton = () => {},
    style,
    heartStyle,
  }: Props) => {
    const heartScale = useSharedValue<number>(0);
    const heartFilledOpacity = useSharedValue<number>(0);
    const likesCountText = useSharedValue<number>(likesCount);
    const heartUnfilledOpacity = useSharedValue<number>(1);
    const firstUpdateFilters: MutableRefObject<boolean> = useRef<boolean>(true);

    const animatedFilledHeartImageStyle: AnimatedStyleProp<ImageStyle> =
      useAnimatedStyle(
        (): ImageStyle => ({
          opacity: heartFilledOpacity.value,
          transform: [{scale: heartScale.value}],
        }),
      );
    const animatedUnfilledHeartImageStyle: AnimatedStyleProp<ImageStyle> =
      useAnimatedStyle(
        (): ImageStyle => ({
          opacity: heartUnfilledOpacity.value,
        }),
      );

    useEffect((): void => {
      if (firstUpdateFilters.current) {
        firstUpdateFilters.current = false;
        if (isActive) {
          setTimeout((): void => {
            heartFilledOpacity.value = withTiming(1, {duration: DURATION});
            heartUnfilledOpacity.value = withTiming(0, {duration: DURATION});
            heartScale.value = withTiming(1, {duration: DURATION});
          }, 10);
        }
      }
    }, [isActive]);

    useSubsequentEffect(
      (): void => {
        InteractionManager.runAfterInteractions((): void => {
          heartFilledOpacity.value = withTiming(isActive ? 1 : 0, {
            duration: DURATION,
          });
          heartUnfilledOpacity.value = withTiming(isActive ? 0 : 1, {
            duration: DURATION,
          });
          heartScale.value = isActive
            ? withDelay(delayIn, withSpring(1, CONFIG))
            : withDelay(delayOut, withTiming(0));
        });
      },
      undefined,
      [isActive],
    );

    const onPressHeart = useCallback((): void => {
      if (typeof onPressButton === 'function') {
        InteractionManager.runAfterInteractions((): void => {
          onPressButton();
        });
      }
    }, [isActive]);

    const text: DerivedValue<string> = useDerivedValue<string>((): string =>
      isActive ? `${likesCountText.value + 1}` : `${likesCountText.value}`,
    );

    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={onPressHeart}
          activeOpacity={1}
          style={[styles.heartButton, style]}>
          <Animated.Image
            source={HEART_UNFILLED}
            style={[styles.heart, heartStyle, animatedUnfilledHeartImageStyle]}
          />
          <Animated.Image
            source={HEART_FILLED}
            style={[styles.heart, heartStyle, animatedFilledHeartImageStyle]}
          />
          <View style={styles.likesCountWrapper}>
            <ReText text={text} style={styles.likesCountText} />
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  },
);

export default HeartButton;

interface Props {
  delayIn?: number;
  delayOut?: number;
  isActive?: boolean;
  likesCount?: number;
  onPressButton?: () => void;
  style?: StyleProp<ViewStyle>;
  heartStyle?: StyleProp<ImageStyle>;
}
