import {Dimensions, Platform} from 'react-native';
import {DependencyList, MutableRefObject, useEffect, useRef} from 'react';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const SAFETY_ZONE: number = 16;

export const SAFETY_ZONE_ON_BOTH_SLIDES: number = SAFETY_ZONE * 2;

export const SAFETY_SCREEN: number = SCREEN_WIDTH - SAFETY_ZONE_ON_BOTH_SLIDES;

export const IS_IOS: boolean = Platform.OS === 'ios';

export const IPHONE_SE: boolean =
  Platform.OS === 'ios' &&
  (SCREEN_HEIGHT === 320 ||
    SCREEN_WIDTH === 320 ||
    SCREEN_HEIGHT === 568 ||
    SCREEN_WIDTH === 568);

export const SCREEN_HEIGHT_MORE_OF_5S: boolean = SCREEN_HEIGHT > 570;

export const SCREEN_WIDTH_MORE_OF_5S: boolean = SCREEN_WIDTH > 320;

export function useSubsequentEffect(
  mount: () => void | Promise<void> | (() => void),
  unmount: () => void = () => null,
  deps: DependencyList = [],
): void {
  const isFirstUpdate: MutableRefObject<boolean> = useRef(true);

  return useEffect((): (() => void) => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
    } else {
      if (typeof mount === 'function') {
        mount();
      }
    }
    return (): void => {
      if (typeof unmount === 'function') {
        unmount();
      }
    };
  }, deps);
}

export function timeIntervalFormattedMethod(
  timeSeconds: number = 0,
  isHour: boolean = false,
): string {
  const SECONDS_PER_HOUR: number = 3600;
  let hour: number;
  let minutes: number;
  let seconds: number;
  if (isHour) {
    hour = (timeSeconds / SECONDS_PER_HOUR) | 0;
    minutes = (timeSeconds / 60 - hour * 60) | 0;
    seconds = (timeSeconds - hour * SECONDS_PER_HOUR - minutes * 60) | 0;
    return `${hour < 10 ? '0' + hour : hour}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  minutes = (timeSeconds / 60) | 0;
  seconds = (timeSeconds - minutes * 60) | 0;
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + String(seconds) : seconds
  }`;
}
