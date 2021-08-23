import { User } from '.';
import Pharmacy from './Pharmacy';

export default interface Owner extends User {
  pharmacy: Pharmacy;
};
