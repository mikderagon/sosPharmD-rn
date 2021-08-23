import colors from '../../styles/colors';
import { hexToRgba } from '../../utils/colors';

export const GRADIENT_COLORS = [
  hexToRgba(colors.main, 1),
  hexToRgba(colors.main, 0.9),
  hexToRgba(colors.main, 0.8),
  hexToRgba(colors.main, 0.9),
  hexToRgba(colors.main, 1),
];

export const verticalDots = require('assets/images/verticalDots.png');
export const calendar = require('assets/images/calendarIcon.png');
export const locumIcon = require('assets/images/locumIcon.png');
export const defaultAvatar = require('assets/images/defaultAvatar.png');
