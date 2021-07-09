import { User } from '.';

export default interface Locum extends User {
  year: number;
  educationalInstitution: string;
  address: string;
}
