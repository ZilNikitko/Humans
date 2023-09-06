import RoutesNames from './RoutesNames';

export type MainStackProps = {
  [RoutesNames.TAB_NAVIGATOR]?: TabBarProps & {
    screen: RoutesNames | keyof typeof RoutesNames;
  };
};

export type TabBarProps = {
  [RoutesNames.QA_SCREEN]?: {};
  [RoutesNames.MAIN_SCREEN]?: {};
  [RoutesNames.MESSAGE_SCREEN]?: {};
  [RoutesNames.PROFILE_SCREEN]?: {};
};
