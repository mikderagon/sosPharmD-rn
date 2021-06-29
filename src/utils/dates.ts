const months = [
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

function getMonthName(monthIndex: number): string {
  return months[monthIndex - 1];
}

function getMonthIndex(monthName: string): number {
  return months.findIndex(month => month === monthName) + 1;
}

interface DateState {
  today: Date;
  monthIndex: number;
  month: string;
  year: number;
  isLeapYear: boolean;
  numberOfDays: number;
  firstDayOfMonth: string;
  firstDayOfMonthIndex: number;
}

function getDateState(): DateState {
  const today = new Date();
  const monthIndex = today.getMonth() + 1;
  const year = today.getFullYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  let numberOfDays = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  // check if feb should have 29 days
  if (numberOfDays === 28 && isLeapYear) {
    numberOfDays = 29;
  }
  const firstDayOfMonthIndex = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  ).getDay();

  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  ).toLocaleTimeString('en-US', {
    weekday: 'long',
    month: 'long',
  });
  return {
    today,
    monthIndex,
    month: getMonthName(monthIndex),
    year,
    isLeapYear,
    numberOfDays,
    firstDayOfMonth,
    firstDayOfMonthIndex,
  };
}

export { getMonthName, getMonthIndex, getDateState };
