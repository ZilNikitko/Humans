import React, {memo, useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
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
const INITIAL_PLAY_WIDTH: number = 0;

const Play = memo(
  ({
    soundLength = 0,
    style,
    buttonStyle,
    imageButtonStyle,
    loadViewStyle,
  }: Props) => {
    const buttonOpacity = useSharedValue<number>(0);
    const [isStart, setIsStart] = useState<boolean>(false);
    const [isOver, setIsOver] = useState<boolean>(false);
    const valueWidthWrapper = useSharedValue<number>(INITIAL_PLAY_WIDTH);

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

    const startPlay = useCallback((): void => {
      setIsStart(prev => !prev);
      paused.value = !paused.value;
      if (valueWidthWrapper.value === INITIAL_PLAY_WIDTH && !isStart) {
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
    }, [isStart, isOver, valueWidthWrapper]);

    return (
      <React.Fragment>
        <View style={[styles.playWrapper, style]}>
          <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={startPlay}>
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
          <TouchableOpacity activeOpacity={0.8} onPress={startPlay}>
            <Animated.View style={[styles.replyButton, buttonAnimatedStyle]}>
              <Text style={styles.replyText}>Reply now</Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  },
);

export default Play;

interface Props {
  soundLength?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loadViewStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  imageButtonStyle?: StyleProp<ImageStyle>;
}
