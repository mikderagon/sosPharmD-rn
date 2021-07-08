export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
  city: string;
  emailVerified?: boolean;
}
