/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
import { Dimensions, Platform } from 'react-native';

// 480: 2G, 3G, 3GS, 4, 4s
const size480 = () =>
  Platform.OS === 'ios' &&
  (Dimensions.get('window').height === 480 ||
    Dimensions.get('window').width === 480);
// 568: SE(1st gen), 5, 5s, 5c
const size568 = () =>
  Platform.OS === 'ios' &&
  (Dimensions.get('window').height === 568 ||
    Dimensions.get('window').width === 568);
// 667: SE(2nd gen), 6, 6s, 7, 8
const size667 = () =>
  Platform.OS === 'ios' &&
  (Dimensions.get('window').height === 667 ||
    Dimensions.get('window').width === 667);
// 736: 6+, 6s+, 7+, 8+
const size736 = () =>
  Platform.OS === 'ios' &&
  (Dimensions.get('window').height === 736 ||
    Dimensions.get('window').width === 736);
// 812: X, Xs, 11 Pro, 12 mini
const size812 = () =>
  Platform.OS === 'ios' &&
  (Dimensions.get('window').height === 812 ||
    Dimensions.get('window').width === 812);
// 844: 12, 12 pro
const size844 = () =>
  Platform.OS === 'ios' &&
  (Dimensions.get('window').height === 844 ||
    Dimensions.get('window').width === 844);
// 896: XR, Xs Max, 11, 11 Pro Max
const size896 = () =>
  Platform.OS === 'ios' &&
  (Dimensions.get('window').height === 896 ||
    Dimensions.get('window').width === 896);
// 926: 12 pro max
const size926 = () =>
  Platform.OS === 'ios' &&
  (Dimensions.get('window').height === 926 ||
    Dimensions.get('window').width === 926);

interface Sizes {
  $480?: number;
  $568?: number;
  $667?: number;
  $736?: number;
  $812?: number;
  $844?: number;
  $896?: number;
  $926?: number;
}

// test line-up: se 1st gen, 6s, 8+, 11pro, 12, 11, 12 pro max
const responsive = ({
  $480,
  $568,
  $667,
  $736,
  $812,
  $844,
  $896,
  $926,
}: Sizes) => {
  if (size480()) {
    return $480;
  }
  if (size568()) {
    return $568 || $480;
  }
  if (size667()) {
    return $667 || $568 || $480;
  }
  if (size736()) {
    return $736 || $667 || $568 || $480;
  }
  if (size812()) {
    return $812 || $736 || $667 || $568 || $480;
  }
  if (size844()) {
    return $844 || $812 || $736 || $667 || $568 || $480;
  }
  if (size896()) {
    return $896 || $844 || $812 || $736 || $667 || $568 || $480;
  }
  if (size926()) {
    return $926 || $896 || $844 || $812 || $736 || $667 || $568 || $480;
  }
};

export { size480, size568, size667, size736, size812, size896, responsive };
