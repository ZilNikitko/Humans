import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import styles from './styles';

const PersonCardMedium = memo(
  ({name = '', work = '', avatar, style}: Props) => (
    <View style={[styles.mainWrapper, style]}>
      {avatar && <Image source={avatar} style={styles.avatarImage} />}
      <View style={styles.textWrapper}>
        {name?.length > 0 && <Text style={styles.name}>{name}</Text>}
        {work?.length > 0 && <Text style={styles.work}>{work}</Text>}
      </View>
    </View>
  ),
);

export default PersonCardMedium;

interface Props {
  name?: string;
  work?: string;
  avatar?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}
