export interface User {
  id: string;
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isBanned?: boolean;
  password?: string;
}
