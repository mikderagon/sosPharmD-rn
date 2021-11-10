import { calendarDimensions } from './Calendar';

const DAYS_PER_WEEK = 7;
export const CELLS_COUNT = DAYS_PER_WEEK * 5;
export const CELLS_COUNT_INCREASED = CELLS_COUNT + DAYS_PER_WEEK;
export const col_margin = calendarDimensions.cell * 1.139;
export const row_margin = calendarDimensions.cell * 1.0;
// 1 2 3 4 5 6 7
// 8 9 ...
export const date_positions = [
  {
    cell: 1,
    x: col_margin,
    y: row_margin * 0,
  },
  {
    cell: 2,
    x: col_margin * 2,
    y: row_margin * 0,
  },
  {
    cell: 3,
    x: col_margin * 3,
    y: row_margin * 0,
  },
  {
    cell: 4,
    x: col_margin * 4,
    y: row_margin * 0,
  },
  {
    cell: 5,
    x: col_margin * 5,
    y: row_margin * 0,
  },
  {
    cell: 6,
    x: col_margin * 6,
    y: row_margin * 0,
  },
  {
    cell: 7,
    x: col_margin * 0,
    y: row_margin * 1,
  },
  {
    cell: 8,
    x: col_margin * 1,
    y: row_margin * 1,
  },
  {
    cell: 9,
    x: col_margin * 2,
    y: row_margin * 1,
  },
  {
    cell: 10,
    x: col_margin * 3,
    y: row_margin * 1,
  },
  {
    cell: 11,
    x: col_margin * 4,
    y: row_margin * 1,
  },
  {
    cell: 12,
    x: col_margin * 5,
    y: row_margin * 1,
  },
  {
    cell: 13,
    x: col_margin * 6,
    y: row_margin * 1,
  },
  {
    cell: 14,
    x: col_margin * 0,
    y: row_margin * 2,
  },
  {
    cell: 15,
    x: col_margin * 1,
    y: row_margin * 2,
  },
  {
    cell: 16,
    x: col_margin * 2,
    y: row_margin * 2,
  },
  {
    cell: 17,
    x: col_margin * 3,
    y: row_margin * 2,
  },
  {
    cell: 18,
    x: col_margin * 4,
    y: row_margin * 2,
  },
  {
    cell: 19,
    x: col_margin * 5,
    y: row_margin * 2,
  },
  {
    cell: 20,
    x: col_margin * 6,
    y: row_margin * 2,
  },
  {
    cell: 21,
    x: col_margin * 0,
    y: row_margin * 3,
  },
  {
    cell: 22,
    x: col_margin * 1,
    y: row_margin * 3,
  },
  {
    cell: 23,
    x: col_margin * 2,
    y: row_margin * 3,
  },
  {
    cell: 24,
    x: col_margin * 3,
    y: row_margin * 3,
  },
  {
    cell: 25,
    x: col_margin * 4,
    y: row_margin * 3,
  },
  {
    cell: 26,
    x: col_margin * 5,
    y: row_margin * 3,
  },
  {
    cell: 27,
    x: col_margin * 6,
    y: row_margin * 3,
  },
  {
    cell: 28,
    x: col_margin * 0,
    y: row_margin * 4,
  },
  {
    cell: 29,
    x: col_margin * 1,
    y: row_margin * 4,
  },
  {
    cell: 30,
    x: col_margin * 2,
    y: row_margin * 4,
  },
  {
    cell: 31,
    x: col_margin * 3,
    y: row_margin * 4,
  },
  {
    cell: 32,
    x: col_margin * 4,
    y: row_margin * 4,
  },
  {
    cell: 33,
    x: col_margin * 5,
    y: row_margin * 4,
  },
  {
    cell: 34,
    x: col_margin * 6,
    y: row_margin * 4,
  },
  {
    cell: 35,
    x: col_margin * 0,
    y: row_margin * 5,
  },
  {
    cell: 36,
    x: col_margin * 1,
    y: row_margin * 5,
  },
  {
    cell: 37,
    x: col_margin * 2,
    y: row_margin * 5,
  },
  {
    cell: 38,
    x: col_margin * 3,
    y: row_margin * 5,
  },
  {
    cell: 39,
    x: col_margin * 4,
    y: row_margin * 5,
  },
  {
    cell: 40,
    x: col_margin * 5,
    y: row_margin * 5,
  },
  {
    cell: 41,
    x: col_margin * 6,
    y: row_margin * 5,
  },
  {
    cell: 42,
    x: col_margin * 6,
    y: row_margin * 5,
  },
];
