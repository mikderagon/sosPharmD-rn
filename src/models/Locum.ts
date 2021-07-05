import { User } from './User';

export interface Locum extends User {
  year: number;
  educationalInstitution: string;
}
