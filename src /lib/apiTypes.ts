import {ImageSourcePropType} from 'react-native';

export interface CategoryButtonType {
  title: string;
}

export interface HumansType {
  personImage: ImageSourcePropType;
  rating: string;
  name: string;
  work: string;
  amount: string;
  workType: string;
}

export interface HumansShortType {
  avatar: ImageSourcePropType;
  name: string;
  work: string;
}
