import {TextStyle} from 'react-native';

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

const fontWeight: {
  [name in 'LIGHT' | 'MEDIUM' | 'SEMI_BOLD' | 'BOLD' | 'REGULAR']: FontWeight;
} = {
  LIGHT: '300',
  REGULAR: '400',
  MEDIUM: '500',
  SEMI_BOLD: '600',
  BOLD: '700',
};

// eslint-disable-next-line no-shadow
export enum TypographyTypes {
  BODY_REGULAR_14 = 'BODY_REGULAR_14',
  BODY_REGULAR_16 = 'BODY_REGULAR_16',
  BODY_MEDIUM_16 = 'BODY_MEDIUM_16',
  BODY_SEMI_BOLD_14 = 'BODY_SEMI_BOLD_14',
  TITLE_1 = 'TITLE_1',
  TITLE_2 = 'TITLE_2',
  CAPTION_12 = 'CAPTION_12',
  CAPTION_REGULAR_12 = 'CAPTION_REGULAR_12',
}

export const SF_PRO_DISPLAY: string = 'SF Pro Display';

export const mainColors = {
  circleTab: 'rgba(255, 255, 255, 0.24)',
  tabBar: '#CDCBD0',
  background: '#F4F3F8',
  base_black: '#000000',
  base_white: '#FFFFFF',
  base_02: '#AEADC0',
  base_03: '#58576F',
  base_04: '#101218',
  primary: '#5663FF',
  primary_08: '#23264F',
  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'rgba(0, 0, 0, 0)',
};

const typography: {[key in TypographyTypes]: TextStyle} = {
  [TypographyTypes.BODY_REGULAR_14]: {
    fontFamily: SF_PRO_DISPLAY,
    fontWeight: fontWeight.REGULAR,
    fontSize: 14,
    lineHeight: 18,
  },
  [TypographyTypes.BODY_REGULAR_16]: {
    fontFamily: SF_PRO_DISPLAY,
    fontWeight: fontWeight.REGULAR,
    fontSize: 16,
    lineHeight: 24,
  },
  [TypographyTypes.BODY_MEDIUM_16]: {
    fontFamily: SF_PRO_DISPLAY,
    fontWeight: fontWeight.MEDIUM,
    fontSize: 16,
    lineHeight: 24,
  },
  [TypographyTypes.BODY_SEMI_BOLD_14]: {
    fontFamily: SF_PRO_DISPLAY,
    fontWeight: fontWeight.SEMI_BOLD,
    fontSize: 14,
    lineHeight: 18,
  },
  [TypographyTypes.TITLE_1]: {
    fontFamily: SF_PRO_DISPLAY,
    fontWeight: fontWeight.MEDIUM,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: 0.36,
  },
  [TypographyTypes.TITLE_2]: {
    fontFamily: SF_PRO_DISPLAY,
    fontWeight: fontWeight.MEDIUM,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.35,
  },
  [TypographyTypes.CAPTION_12]: {
    fontFamily: SF_PRO_DISPLAY,
    fontWeight: fontWeight.MEDIUM,
    fontSize: 12,
    lineHeight: 16,
  },
  [TypographyTypes.CAPTION_REGULAR_12]: {
    fontFamily: SF_PRO_DISPLAY,
    fontWeight: fontWeight.REGULAR,
    fontSize: 12,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
};

export const StyleGuide = {
  fontWeight,
  mainColors,
  typography,
};
