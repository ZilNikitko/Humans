import {
  LIST_AVATAR,
  PERSON,
  QA_AVATAR,
  QA_AVATAR_2,
  QA_AVATAR_SMALL,
  QA_AVATAR_SMALL_2,
} from '../../static';

import type {CategoryButtonType, HumansType, HumansShortType} from './apiTypes';
import {DataQAType} from './apiTypes';

export const CATEGORY_MOCK_DATA: Array<CategoryButtonType> = [
  {title: 'Business'},
  {title: 'Career'},
  {title: 'Business'},
  {title: 'Career'},
  {title: 'Business'},
  {title: 'Career'},
];

export const NEW_HUMANS_MOCK_DATA: Array<HumansType> = [
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
];

export const BEST_MATCHES_MOCK_DATA: Array<HumansType> = [
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
];

export const RECENTLY_MOCK_DATA: Array<HumansShortType> = [
  {
    avatar: LIST_AVATAR,
    name: 'Lloyd Daniels',
    work: 'FoodTech',
  },
  {
    avatar: LIST_AVATAR,
    name: 'Lloyd Daniels',
    work: 'FoodTech',
  },
  {
    avatar: LIST_AVATAR,
    name: 'Lloyd Daniels',
    work: 'FoodTech',
  },
  {
    avatar: LIST_AVATAR,
    name: 'Lloyd Daniels',
    work: 'FoodTech',
  },
  {
    avatar: LIST_AVATAR,
    name: 'Lloyd Daniels',
    work: 'FoodTech',
  },
  {
    avatar: LIST_AVATAR,
    name: 'Lloyd Daniels',
    work: 'FoodTech',
  },
];

export const ALL_EXPERT_MOCK_DATA: Array<HumansType> = [
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
  {
    personImage: PERSON,
    rating: '8.0',
    name: 'Name Surname',
    work: 'Founder Howtogreen, Marketing',
    amount: '$150',
    workType: 'Session',
  },
];

export const QA_DATA: Array<DataQAType> = [
  {
    backGroundImage: QA_AVATAR,
    roundImage: QA_AVATAR_SMALL,
    rating: '8.4',
    name: 'Kate Ivanovskaya',
    work: 'Coach, lifestyle specialist',
    question: 'Where to get more creative energy these days?',
    likesCount: 389,
    userCount: 10,
    audioDuration: 5,
  },
  {
    backGroundImage: QA_AVATAR_2,
    roundImage: QA_AVATAR_SMALL_2,
    rating: '6.0',
    name: 'Olivia Klare',
    work: 'Coach, lifestyle specialist',
    question: 'Where to get more creative energy these days?',
    likesCount: 100,
    userCount: 5,
    audioDuration: 5,
  },
  {
    backGroundImage: QA_AVATAR,
    roundImage: QA_AVATAR_SMALL,
    rating: '8.4',
    name: 'Kate Ivanovskaya',
    work: 'Coach, lifestyle specialist',
    question: 'Where to get more creative energy these days?',
    likesCount: 389,
    userCount: 10,
    audioDuration: 5,
  },
];
