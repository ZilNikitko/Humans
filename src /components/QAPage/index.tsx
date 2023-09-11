import React, {memo, useState, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  ImageStyle,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Animated, {
  AnimatedStyleProp,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import HeartButton from '../HeartButton';
import AvatarCards from '../AvatarCards';
import Play from '../Play';
import {
  RATING_UP,
  AVATAR_ROW_1,
  AVATAR_ROW_2,
  AVATAR_ROW_3,
  VERIFICATION,
} from '../../../static';

import styles from './styles';

const QAPage = memo(
  ({
    name,
    work,
    index,
    offset,
    rating,
    position,
    question,
    userCount,
    roundImage,
    likesCount,
    audioDuration,
    handleOnPressNextPage = () => {},
    handleOnPressPreviousPage = () => {},
    currentPagerIndex,
  }: Props) => {
    const [pressedHeart, setPressedHeart] = useState<boolean>(false);

    const opacityValue: Readonly<SharedValue<number>> =
      useDerivedValue<number>(() => {
        const STEP_VALUE: number = 0.5;
        if (
          index < currentPagerIndex ||
          (index > currentPagerIndex && position.value === index) ||
          (index === currentPagerIndex && position.value >= currentPagerIndex)
        ) {
          return 1 - offset.value / STEP_VALUE;
        }

        return 1 - (1 - offset.value) / STEP_VALUE;
      }, [index, currentPagerIndex]);

    const opacityAnimatedStyle: AnimatedStyleProp<ViewStyle> = useAnimatedStyle(
      (): ViewStyle => ({
        opacity: opacityValue.value,
      }),
    );

    const onPressHeart = useCallback(() => {
      setPressedHeart(prev => !prev);
    }, []);

    const imageParallaxTranslateX: Readonly<SharedValue<number>> =
      useDerivedValue<number>(() => {
        const STEP_VALUE: number = -50;
        if (
          (index > currentPagerIndex && position.value !== index) ||
          (index === currentPagerIndex && position.value < currentPagerIndex)
        ) {
          return -((1 - offset.value) * STEP_VALUE);
        }

        return offset.value * STEP_VALUE;
      }, [index, currentPagerIndex]);

    const imageScaleValue: Readonly<SharedValue<number>> =
      useDerivedValue<number>(() => {
        const STEP_VALUE: number = 3;
        if (
          index < currentPagerIndex ||
          (index > currentPagerIndex && position.value === index) ||
          (index === currentPagerIndex && position.value >= currentPagerIndex)
        ) {
          return (1 - offset.value) / STEP_VALUE + 1;
        }

        return offset.value / STEP_VALUE + 1;
      }, [index, currentPagerIndex]);

    const imageAnimatedStyle: AnimatedStyleProp<ImageStyle> = useAnimatedStyle(
      (): ImageStyle => ({
        transform: [
          {
            translateX: imageParallaxTranslateX.value,
          },
          {
            scale: imageScaleValue.value,
          },
        ],
      }),
    );

    const onPressNextPage = useCallback(() => {
      if (typeof handleOnPressNextPage === 'function') {
        handleOnPressNextPage();
      }
    }, [currentPagerIndex]);

    const onPressPreviousPage = useCallback(() => {
      if (typeof handleOnPressNextPage === 'function') {
        handleOnPressPreviousPage();
      }
    }, [currentPagerIndex]);

    return (
      <View style={styles.mainWrapper}>
        <View style={styles.contentWrapper}>
          <View>
            {roundImage && (
              <Animated.View style={[styles.imageWrapper, imageAnimatedStyle]}>
                <Image source={roundImage} style={styles.qaImage} />
              </Animated.View>
            )}
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={onPressPreviousPage}
              style={[styles.pageButton, styles.pageButtonLeft]}
            />
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={onPressNextPage}
              style={styles.pageButton}
            />
          </View>
          <Animated.View style={[opacityAnimatedStyle]}>
            <View style={[styles.subContentWrapper]}>
              <View style={styles.authorTextWrapper}>
                {rating && (
                  <View style={styles.ratingRow}>
                    <Text style={styles.rating}>{rating}</Text>
                    <Image source={RATING_UP} style={styles.ratingImage} />
                  </View>
                )}
                {name && (
                  <View style={styles.textRow}>
                    <Text style={styles.name}>{name}</Text>
                    <Image
                      source={VERIFICATION}
                      style={styles.verificationImage}
                    />
                  </View>
                )}
                {work && (
                  <View style={styles.workWrapper}>
                    <Text style={styles.work}>{work}</Text>
                  </View>
                )}
              </View>
              {question && (
                <View style={styles.questionTextWrapper}>
                  <Text style={styles.questionText}>{question}</Text>
                </View>
              )}
              {likesCount && (
                <HeartButton
                  style={styles.heartButton}
                  onPressButton={onPressHeart}
                  isActive={pressedHeart}
                  likesCount={likesCount}
                />
              )}
              {userCount && (
                <AvatarCards
                  firstAvatar={AVATAR_ROW_1}
                  secondAvatar={AVATAR_ROW_2}
                  thirdAvatar={AVATAR_ROW_3}
                  usersCount={userCount}
                />
              )}
            </View>
            {audioDuration && (
              <Play style={styles.play} soundLength={audioDuration} />
            )}
          </Animated.View>
        </View>
      </View>
    );
  },
);

export default QAPage;

interface Props {
  name?: string;
  work?: string;
  index: number;
  offset: SharedValue<number>;
  rating?: string;
  position: SharedValue<number>;
  question?: string;
  userCount?: number;
  roundImage?: ImageSourcePropType;
  likesCount?: number;
  audioDuration?: number;
  currentPagerIndex: number;
  handleOnPressNextPage?: () => void;
  handleOnPressPreviousPage?: () => void;
}
