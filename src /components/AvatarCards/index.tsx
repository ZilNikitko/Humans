import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
} from 'react-native';

import {AVATAR} from '../../../static';

import styles from './styles';

const AvatarCards = memo(
  ({
    usersCount = 0,
    thirdAvatar = AVATAR,
    firstAvatar = AVATAR,
    secondAvatar = AVATAR,
    style,
  }: Props) => (
    <View style={[styles.avatarRow, style]}>
      <Image source={firstAvatar} style={styles.avatar} />
      <Image source={secondAvatar} style={styles.avatar} />
      <Image source={thirdAvatar} style={styles.avatar} />
      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.buttonText}>{`+${usersCount}`}</Text>
      </TouchableOpacity>
    </View>
  ),
);

export default AvatarCards;

interface Props {
  usersCount?: number;
  thirdAvatar?: ImageSourcePropType;
  firstAvatar?: ImageSourcePropType;
  secondAvatar?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}
