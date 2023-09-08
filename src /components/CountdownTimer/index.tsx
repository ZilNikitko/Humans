import React, {
  memo,
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {View, Text, StyleProp, TextStyle, ViewStyle} from 'react-native';

import {timeIntervalFormattedMethod} from '../../lib/utils';

import styles from './styles';

const ONE_SECOND: number = 1000;

const CountdownTimer = memo(
  ({
    style,
    textStyle,
    isStart = false,
    initialTimeInterval = 0,
    onTimerEnd = () => {},
  }: Props) => {
    const [timeInterval, setTimeInterval] =
      useState<number>(initialTimeInterval);
    const [isActive, setIsActive] = useState<boolean>(false);
    const countRef = useRef<number>(timeInterval);

    const updateTimeInterval = useCallback(
      (newTime: number): void => {
        setTimeInterval(newTime);
        countRef.current = newTime;
      },
      [countRef],
    );

    useEffect((): (() => void) => {
      let interval: ReturnType<typeof setInterval> | null = null;
      if (isActive) {
        interval = setInterval(() => {
          updateTimeInterval(countRef.current - 1);
        }, ONE_SECOND);
      } else if (!isActive && timeInterval !== 0) {
        clearInterval(interval as unknown as ReturnType<typeof setInterval>);
      }
      if (timeInterval <= 0) {
        clearInterval(interval as unknown as ReturnType<typeof setInterval>);
        setTimeInterval(0);
        onTimerEnd();
      }
      return (): void =>
        clearInterval(interval as unknown as ReturnType<typeof setInterval>);
    }, [isActive, timeInterval]);

    const timeIntervalFormatted: string = useMemo(
      () => timeIntervalFormattedMethod(timeInterval),
      [timeInterval],
    );

    useEffect((): void => {
      setIsActive(isStart);
      if (!isStart) {
        updateTimeInterval(initialTimeInterval);
      }
    }, [isStart]);

    return (
      <View style={[styles.timerWrapper, style]}>
        <Text style={[styles.timeText, textStyle]}>
          {timeIntervalFormatted}
        </Text>
      </View>
    );
  },
);

export default CountdownTimer;

interface Props {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isStart?: boolean;
  initialTimeInterval?: number;
  onTimerEnd?: () => void;
}
