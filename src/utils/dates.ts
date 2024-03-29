export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const mois = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export function getMonthName(monthIndex: number): string {
  return months[monthIndex - 1];
}

export function getMonthIndex(monthName: string): number {
  return months.findIndex(month => month === monthName) + 1;
}

// french version
export function formatDay(day: number | undefined): string {
  if (typeof day === 'undefined') {
    return '';
  }
  if (day === 1) {
    return '1er';
  }
  return day.toString();
}

const weekdays_long = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const weekdays_short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const jours_semaines = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
export interface CalendarState {
  day: number;
  month: number;
  monthName: string;
  year: number;
  monthLength: number;
  firstWeekdayOfMonth: string;
  firstWeekdayOfMonthIndex: number;
}

export function getCalendarState(date: Date): CalendarState {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const monthLength = getNumberOfDaysInMonth(month - 1, year);

  const firstWeekdayOfMonthIndex = getFirstWeekdayOfMonthIndex(month - 1, year);
  const firstWeekdayOfMonth = new Date(year, month, 1).toLocaleTimeString(
    'en-US',
    {
      weekday: 'long',
      month: 'long',
    },
  );

  return {
    day,
    month,
    monthName: getMonthName(month),
    year,
    monthLength,
    firstWeekdayOfMonthIndex,
    firstWeekdayOfMonth,
  };
}

// return: 0..6
// use: calendar cell animations
export function getFirstWeekdayOfMonthIndex(
  month: number,
  year: number,
): number {
  return new Date(year, month, 1).getDay();
}

// return: 'Sunday'..'Saturday'
export function getFirstWeekdayOfMonth(month: number, year: number) {
  const firstDayOfMonth = new Date(year, month, 1)
    .toLocaleTimeString('en-US', {
      weekday: 'long',
      month: 'long',
    })
    .split(' ')[0];
  return firstDayOfMonth;
}

export function getNumberOfDaysInMonth(month: number, year: number): number {
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  let numberOfDaysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  // check if feb should have 29 days
  if (numberOfDaysInCurrentMonth === 28 && isLeapYear) {
    numberOfDaysInCurrentMonth = 29;
  }
  return numberOfDaysInCurrentMonth;
}
