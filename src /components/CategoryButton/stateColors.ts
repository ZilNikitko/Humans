import {StyleGuide} from '../mainStyles';

// eslint-disable-next-line no-shadow
export enum CategoryButtonColors {
  Inactive,
  Active,
}

export const ButtonBorderColors: {[key in string]: string} = {
  [CategoryButtonColors.Inactive]: StyleGuide.mainColors.background,
  [CategoryButtonColors.Active]: StyleGuide.mainColors.primary,
};
