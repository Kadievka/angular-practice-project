export interface User {
  id: string;
  _id: string;
  email: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  isBanned?: boolean;
  password?: string;
  cellphone?: string;
  address?: string;
}
