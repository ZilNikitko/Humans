import {Dimensions, Platform} from 'react-native';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const SAFETY_ZONE: number = 16;

export const SAFETY_ZONE_ON_BOTH_SLIDES: number = SAFETY_ZONE * 2;

export const SAFETY_SCREEN: number = SCREEN_WIDTH - SAFETY_ZONE_ON_BOTH_SLIDES;

export const IS_IOS: boolean = Platform.OS === 'ios';

export const IPHONE_SE: boolean =
  Platform.OS === 'ios' &&
  (SCREEN_HEIGHT === 320 ||
    SCREEN_WIDTH === 320 ||
    SCREEN_HEIGHT === 568 ||
    SCREEN_WIDTH === 568);

export const SCREEN_HEIGHT_MORE_OF_5S: boolean = SCREEN_HEIGHT > 570;

export const SCREEN_WIDTH_MORE_OF_5S: boolean = SCREEN_WIDTH > 320;
