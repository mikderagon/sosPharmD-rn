export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
  city: string;
  emailVerified?: boolean;
}
