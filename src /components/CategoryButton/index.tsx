import React, {memo, useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, ViewStyle} from 'react-native';

import styles from './styles';
import Animated, {
  AnimatedStyleProp,
  DerivedValue,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {ButtonBorderColors, CategoryButtonColors} from './stateColors';

const FILTER_BUTTON_RANGE: [number, number] = [0, 1];
const DURATION: number = 400;

const CategoryButton = memo(
  ({index, title, isActive = false, handleOnPress = () => {}}: Props) => {
    const [active, setActive] = useState<boolean>(false);

    const onPress = useCallback((): void => {
      if (typeof handleOnPress === 'function' && index !== undefined) {
        handleOnPress(index);
      }
    }, [active]);

    useEffect(() => {
      setActive(isActive);
    }, [isActive]);

    const filterButtonWithTiming: DerivedValue<number> =
      useDerivedValue<number>(
        () =>
          withTiming(Number(isActive), {
            duration: active ? DURATION : DURATION - DURATION / 3,
          }),
        [isActive],
      );

    const toggleButtonAnimationStyles: AnimatedStyleProp<ViewStyle> =
      useAnimatedStyle((): ViewStyle => {
        const viewButtonStyle: string | number = interpolateColor(
          filterButtonWithTiming.value,
          FILTER_BUTTON_RANGE,
          [
            ButtonBorderColors[CategoryButtonColors.Inactive],
            ButtonBorderColors[CategoryButtonColors.Active],
          ],
        );

        return {
          borderBottomColor: viewButtonStyle as string,
        };
      });

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1.0}>
        <Animated.View
          style={[styles.mainWrapper, toggleButtonAnimationStyles]}>
          <Text style={styles.buttonTitle}>{title}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  },
);

export default CategoryButton;

interface Props {
  index?: number;
  title?: string;
  isActive?: boolean;
  handleOnPress?: (index: number) => void;
}
