import { User } from '.';

export default interface Locum extends User {
  year: number;
  school: string;
  address: string;
};
