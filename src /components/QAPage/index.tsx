import React, {memo, useState, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import Animated, {
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
  SharedValue,
  AnimatedStyleProp,
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
    rating,
    progress,
    question,
    userCount,
    roundImage,
    likesCount,
    audioDuration,
    currentPagerIndex,
    handleOnPressNextPage = () => {},
    handleOnPressPreviousPage = () => {},
  }: Props) => {
    const [pressedHeart, setPressedHeart] = useState<boolean>(false);

    const opacityValue: Readonly<SharedValue<number>> =
      useDerivedValue<number>(() => {
        if (Math.round(progress.value) === index) {
          return withTiming(1, {duration: 300});
        }

        return withTiming(0, {duration: 300});
      }, [index, currentPagerIndex]);

    const opacityAnimatedStyle: AnimatedStyleProp<ViewStyle> = useAnimatedStyle(
      (): ViewStyle => ({
        opacity: opacityValue.value,
      }),
    );

    const sizeValue: Readonly<SharedValue<number>> =
      useDerivedValue<number>(() => {
        if (Math.round(progress.value) === index) {
          return withTiming(148, {duration: 300});
        }

        return withTiming(100, {duration: 300});
      }, [index, currentPagerIndex]);

    const roundAnimatedStyle: AnimatedStyleProp<ViewStyle> = useAnimatedStyle(
      (): ViewStyle => ({
        width: sizeValue.value,
        height: sizeValue.value,
      }),
    );

    const onPressHeart = useCallback(() => {
      setPressedHeart(prev => !prev);
    }, []);

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
              <View style={styles.imageWrapper}>
                <Animated.Image
                  source={roundImage}
                  style={[roundAnimatedStyle]}
                />
              </View>
            )}
            {index === currentPagerIndex && (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </View>
          <View>
            <Animated.View
              style={[styles.subContentWrapper, opacityAnimatedStyle]}>
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
            </Animated.View>
            <Animated.View style={[styles.play, opacityAnimatedStyle]}>
              {audioDuration && <Play soundLength={audioDuration} />}
            </Animated.View>
          </View>
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
  rating?: string;
  question?: string;
  progress: SharedValue<number>;
  userCount?: number;
  roundImage?: ImageSourcePropType;
  likesCount?: number;
  audioDuration?: number;
  currentPagerIndex: number;
  handleOnPressNextPage?: () => void;
  handleOnPressPreviousPage?: () => void;
}
