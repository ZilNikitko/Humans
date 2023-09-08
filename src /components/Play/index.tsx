import React, {memo, useCallback, useState, useEffect} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';

import Animated, {
  Easing,
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  AnimatedStyleProp,
} from 'react-native-reanimated';
import {withPause} from 'react-native-redash';

import {PLAY, PAUSE} from '../../../static';
import {SCREEN_WIDTH} from '../../lib/utils';
import CountdownTimer from '../CountdownTimer';

import styles from './styles';

const DURATION: number = 300;

const CurrentWorkout = memo(
  ({
    soundLength = 0,
    onEndTrack = () => {},
    style,
    buttonStyle,
    imageButtonStyle,
    loadViewStyle,
  }: Props) => {
    const buttonOpacity = useSharedValue<number>(0);
    const valueWidthWrapper = useSharedValue<number>(0);
    const [isStart, setIsStart] = useState<boolean>(false);
    const [isOver, setIsOver] = useState<boolean>(false);

    const paused = useSharedValue<boolean>(!isStart);

    const progressBarAnimatedStyle: AnimatedStyleProp<ViewStyle> =
      useAnimatedStyle(
        (): ViewStyle => ({
          width: valueWidthWrapper.value,
        }),
      );

    const buttonAnimatedStyle: AnimatedStyleProp<ViewStyle> = useAnimatedStyle(
      (): ViewStyle => ({
        opacity: buttonOpacity.value,
      }),
    );

    useEffect(() => {
      if (isOver) {
        buttonOpacity.value = withTiming(1, {duration: DURATION});
      }
    }, [isOver]);

    const startTrain = useCallback((): void => {
      setIsStart(prev => !prev);
      paused.value = !paused.value;
      if (valueWidthWrapper.value === 0) {
        valueWidthWrapper.value = withPause(
          withTiming(
            SCREEN_WIDTH - 120,
            {duration: soundLength * 1000, easing: Easing.linear},
            (): void => {
              runOnJS(setIsOver)(true);
              runOnJS(setIsStart)(false);
            },
          ),
          paused,
        );
      }
    }, [isStart]);

    useEffect((): void => {
      if (isOver) {
        onEndTrack();
      }
    }, [isOver]);

    return (
      <React.Fragment>
        <View style={[styles.playWrapper, style]}>
          <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={startTrain}>
            <Image
              style={[styles.buttonImage, imageButtonStyle]}
              source={isStart ? PAUSE : PLAY}
            />
          </TouchableOpacity>
          <View style={styles.mainWrapper}>
            <Animated.View
              style={[styles.loadView, progressBarAnimatedStyle, loadViewStyle]}
            />
          </View>
          <View style={styles.timeTextWrapper}>
            <CountdownTimer
              isStart={isStart}
              initialTimeInterval={soundLength}
            />
          </View>
        </View>
        {isOver && (
          <TouchableOpacity activeOpacity={0.8}>
            <Animated.View style={[styles.replyButton, buttonAnimatedStyle]}>
              <Text style={styles.replyText}>Reply now</Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  },
);

export default CurrentWorkout;

interface Props {
  soundLength?: number;
  onEndTrack?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loadViewStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  imageButtonStyle?: StyleProp<ImageStyle>;
}
