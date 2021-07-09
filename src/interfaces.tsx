import { Locum } from './models';

export interface DateObject {
  day: number;
  month: number;
  year: number;
}
export interface LocumTag {
  user: Locum;
  date: {
    day: number;
    month: number;
    year: number;
  };
}
