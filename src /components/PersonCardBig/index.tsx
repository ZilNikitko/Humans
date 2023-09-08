import React, {memo, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  InteractionManager,
} from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {RATING_UP, VERIFICATION} from '../../../static';

import styles from './styles';

const DURATION: number = 500;

const PersonCardBig = memo(
  ({
    name = '',
    work = '',
    rating = '',
    amount = '',
    workType = '',
    isLargeCard = true,
    personImage,
    style,
  }: Props) => {
    const imageOpacity = useSharedValue<number>(0);

    const ImageBackgroundAnimatedComponent =
      Animated.createAnimatedComponent(ImageBackground);

    const imageAnimatedStyle = useAnimatedStyle(() => ({
      opacity: imageOpacity.value,
    }));

    const onLoadImage = useCallback((): void => {
      InteractionManager.runAfterInteractions((): void => {
        imageOpacity.value = withTiming(1, {duration: DURATION});
      });
    }, []);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.mainWrapper,
          isLargeCard && styles.mainWrapperLarge,
          style,
        ]}>
        {rating?.length > 0 && (
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>{rating}</Text>
            <Image source={RATING_UP} style={styles.ratingImage} />
          </View>
        )}
        {personImage && (
          <ImageBackgroundAnimatedComponent
            source={personImage}
            onLoad={onLoadImage}
            style={[styles.backGroundImageWrapper, imageAnimatedStyle]}
            imageStyle={styles.backGroundImage}
          />
        )}
        <View style={styles.infoContent}>
          {name?.length > 0 && (
            <View style={styles.textRow}>
              <Text style={styles.name}>{name}</Text>
              <Image source={VERIFICATION} style={styles.verificationImage} />
            </View>
          )}
          {work?.length > 0 && <Text style={styles.work}>{work}</Text>}
          <View style={styles.textRow}>
            {amount?.length > 0 && <Text style={styles.price}>{amount}</Text>}
            {workType?.length > 0 && (
              <Text style={styles.price}>{`• ${workType}`}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

export default PersonCardBig;

interface Props {
  name?: string;
  work?: string;
  amount?: string;
  rating?: string;
  workType?: string;
  isLargeCard?: boolean;
  personImage?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}
