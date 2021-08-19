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
  error?: {
    message: string;
  }
  status?: number;
  profilePhotoId?: string;
  profilePhotoName?: string;
  profilePhotoPath?: string;
  profilePhotoType?: string;
  profilePhotoSize?: number;

}
