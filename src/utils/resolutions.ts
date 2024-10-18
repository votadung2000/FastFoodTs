import { Platform, StatusBar, Dimensions } from 'react-native';
import { isIphoneX } from 'react-native-iphone-screen-helper';

const { height, width } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight || 0;

const deviceHeight =
  isIphoneX() || Platform.OS === 'android'
    ? standardLength - offset
    : standardLength;

export function RFPercentage(percent: number) {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}

// guideline height for standard 5" device screen is 680
export function RFValue(fontSize: number, standardScreenHeight = 680) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

// padding, margin, fontSize, ....
export const scale = (size: number) => (width / guidelineBaseWidth) * size;

// width
export const wScale = (size: number) => (height / guidelineBaseHeight) * size;

// height
export const hScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
