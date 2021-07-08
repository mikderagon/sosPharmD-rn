import { User } from '.';

export default interface Owner extends User {
  pharmacy: string;
};
