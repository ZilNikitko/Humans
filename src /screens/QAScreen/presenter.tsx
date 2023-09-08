import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {
  DOTS,
  QA_AVATAR,
  RATING_UP,
  VERIFICATION,
  AVATAR_ROW_1,
  AVATAR_ROW_2,
  AVATAR_ROW_3,
  CHEVRON_DOWN,
  QA_AVATAR_SMALL,
} from '../../../static';
import HeartButton from '../../components/HeartButton';
import {BlurView} from '@react-native-community/blur';
import {StyleGuide} from '../../components/mainStyles';
import AvatarCards from '../../components/AvatarCards';
import Play from '../../components/Play';

const ImageBackgroundAnimatedComponent =
  Animated.createAnimatedComponent(ImageBackground);

import styles from './styles';

const DURATION: number = 300;

const Presenter = ({}) => {
  const navigation = useNavigation();
  const imageBackgroundOpacity = useSharedValue<number>(0);
  const [pressedHeart, setPressedHeart] = useState<boolean>(false);

  const imageBackgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageBackgroundOpacity.value,
  }));

  const onPressHeart = useCallback(() => {
    setPressedHeart(prev => !prev);
  }, []);

  const onLoadImage = useCallback((): void => {
    InteractionManager.runAfterInteractions((): void => {
      imageBackgroundOpacity.value = withTiming(1, {duration: DURATION});
    });
  }, []);

  const onPressGoBack = useCallback((): void => {
    navigation.goBack();
  }, []);

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="dark-content" />
      <ImageBackgroundAnimatedComponent
        source={QA_AVATAR}
        onLoad={onLoadImage}
        style={[styles.backGroundImage, imageBackgroundAnimatedStyle]}
      />
      <BlurView
        blurType="dark"
        blurAmount={60}
        reducedTransparencyFallbackColor={StyleGuide.mainColors.base_white}
        style={styles.blurView}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.headerButtonWrapper}
              onPress={onPressGoBack}>
              <Image source={CHEVRON_DOWN} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.headerButtonWrapper}>
              <Image source={DOTS} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageWrapper}>
            <Image source={QA_AVATAR_SMALL} style={styles.qaImage} />
          </View>
          <View style={styles.subContentWrapper}>
            <View style={styles.authorTextWrapper}>
              <View style={styles.ratingRow}>
                <Text style={styles.rating}>8.4</Text>
                <Image source={RATING_UP} style={styles.ratingImage} />
              </View>
              <View style={styles.textRow}>
                <Text style={styles.name}>Kate Ivanovskaya</Text>
                <Image source={VERIFICATION} style={styles.verificationImage} />
              </View>
              <Text style={styles.work}>Coach, lifestyle specialist</Text>
            </View>
            <View style={styles.questionTextWrapper}>
              <Text style={styles.questionText}>
                Where to get more creative energy these days?
              </Text>
            </View>
            <HeartButton
              style={styles.heartButton}
              onPressButton={onPressHeart}
              isActive={pressedHeart}
              likesCount={359}
            />
            <AvatarCards
              firstAvatar={AVATAR_ROW_1}
              secondAvatar={AVATAR_ROW_2}
              thirdAvatar={AVATAR_ROW_3}
              usersCount={19}
            />
          </View>
          <Play style={styles.play} soundLength={5} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Presenter;
