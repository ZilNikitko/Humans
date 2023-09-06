import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
} from 'react-native';

import {RATING_UP, VERIFICATION} from '../../../static';

import styles from './styles';

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
  }: Props) => (
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
        <ImageBackground
          source={personImage}
          style={styles.backGroundImageWrapper}
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
  ),
);

export default PersonCardBig;

interface Props {
  rating?: string;
  name?: string;
  work?: string;
  amount?: string;
  workType?: string;
  isLargeCard?: boolean;
  personImage?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}
