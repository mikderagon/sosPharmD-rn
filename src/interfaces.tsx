import { Event, Locum, Owner } from './models';

export interface DateObject {
  day: number;
  month: number;
  year: number;
}
export interface LocumTag {
  user: Locum;
  date: DateObject;
}

export interface ContractTag {
  user: Owner;
  date: DateObject;
  event: Event;
}
