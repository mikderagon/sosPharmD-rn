import { User } from '.';

export default interface Locum extends User {
  schoolYear: string;
  school: string;
}
