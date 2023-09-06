import React from 'react';
import {Text} from 'react-native';

import styles from './styles';
import SafeAreaViewOS from '../../components/SafeAreaViewOS';

const Presenter = ({}) => (
  <SafeAreaViewOS style={styles.safeAreaView}>
    <Text style={styles.text}>ProfileScreen</Text>
  </SafeAreaViewOS>
);

export default Presenter;
