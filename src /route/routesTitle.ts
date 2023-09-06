import RoutesNames from './routesNames';

export default function (route: RouteType) {
  if (route) {
    switch (route.name) {
      case RoutesNames.QA_SCREEN:
        return {title: 'QA'};
      case RoutesNames.MAIN_SCREEN:
        return {title: 'Главная'};
      case RoutesNames.MESSAGE_SCREEN:
        return {title: 'Message'};
      case RoutesNames.PROFILE_SCREEN:
        return {title: 'PROFILE'};
      default:
        return {};
    }
  }
}

type RouteType = Readonly<{key: string; name: RoutesNames; path?: string}> &
  Readonly<{params?: Readonly<{} | undefined>}>;
