import { User } from './User';

export interface Owner extends User {
  pharmacy: string;
}
