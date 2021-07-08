import { User } from './models';

export interface DateObject {
  day: number;
  month: number;
  year: number;
}

export interface Event {
  id: number;
  title: string;
  location: string;
  minExperience: string;
  startTime: string;
  endTime: string;
  interestedLocums?: number[]; // User Ids
  acceptedLocums?: number[];
}
export interface LocumTag {
  user: User;
  date: {
    day: number;
    month: number;
    year: number;
  };
}
