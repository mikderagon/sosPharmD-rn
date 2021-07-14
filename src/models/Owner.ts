import { User } from '.';

export default interface Owner extends User {
  pharmacyId: string;
  pharmacyAddress?: string;
  pharmacyAffiliation?: string;
}
