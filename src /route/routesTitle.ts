import RoutesNames from './routesNames';

export default function (route: RouteType) {
  if (route) {
    switch (route.name) {
      case RoutesNames.MAIN_SCREEN:
        return {title: 'Главная'};
      default:
        return {};
    }
  }
}

type RouteType = Readonly<{key: string; name: RoutesNames; path?: string}> &
  Readonly<{params?: Readonly<{} | undefined>}>;
