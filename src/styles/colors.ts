import { hexToRgba } from '../helpers/hexToRgba';

const themeColor = '#3FC1C9';

// export const themeColors = {
//   dark: '#364F6B',
//   light: '#3FC1C9',
//   accent1: '#F5F5F5',
//   accent2: '#FC5185',
// };

export const themeColors = {
  dark: '#494949',
  accent1: '#0ff',
  accent2: '#f00',
  light: '#ddd',
};

const colors = {
  darkerBlue: '#303D5C',
  darkBlue: '#1D2366',
  // main: '#1E81CE',
  lime: 'rgba(62, 180, 137, 0.4)',
  darkLime: 'rgba(62, 180, 137, 1)',
  // main: '#009ffd',
  // main: '#246EE9',
  // main: '#5BA3D9',
  main: themeColor,
  lightMain: hexToRgba(themeColor, 0.4),
  lightGray: '#ccc',
  gray: '#aaa',
  darkGray: '#494949',
  red: 'rgba(255, 36, 0, 0.4)',
  white: '#fff',
};

export default colors;
