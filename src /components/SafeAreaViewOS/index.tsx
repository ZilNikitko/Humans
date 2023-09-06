import React, {memo, useMemo, ReactNode} from 'react';
import {View, SafeAreaView, ViewStyle, StyleProp} from 'react-native';

import {IS_IOS} from '../../lib/utils';

import styles from './styles';

const SafeAreaViewOS = memo(({isHeader = false, children, style}: Props) => {
  const isView: boolean = useMemo(() => IS_IOS && !isHeader, [isHeader]);
  const isOSFragment: boolean = useMemo(() => !IS_IOS && isHeader, [isHeader]);

  return isView ? (
    <View style={[!isHeader && styles.mainWrapper, style]}>
      {children ? children : <React.Fragment />}
    </View>
  ) : isOSFragment ? (
    <React.Fragment>{children ? children : <React.Fragment />}</React.Fragment>
  ) : (
    <SafeAreaView style={[!isHeader && styles.mainWrapper, style]}>
      {children ? children : <React.Fragment />}
    </SafeAreaView>
  );
});

export default SafeAreaViewOS;

interface Props {
  isHeader?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}
