export interface User {
  id: string;
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  isBanned?: boolean;
  password?: string;
}
