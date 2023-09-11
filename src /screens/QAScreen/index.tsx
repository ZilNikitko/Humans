import React, {useCallback} from 'react';
import Presenter from './presenter';
import {useNavigation} from '@react-navigation/native';
import {QA_DATA} from '../../lib/Api';
import {ImageSourcePropType} from 'react-native';

const QAScreen = () => {
  const imageArray: Array<ImageSourcePropType> = QA_DATA.map(
    item => item.backGroundImage,
  );
  const navigation = useNavigation();

  const onPressGoBack = useCallback((): void => {
    navigation.goBack();
  }, []);

  return <Presenter {...{onPressGoBack, imageArray}} />;
};

export default QAScreen;
