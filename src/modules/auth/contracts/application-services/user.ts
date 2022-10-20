import { User } from '@/modules/auth/contracts/models';

export interface UserListParams {
  email?: string;
}

export type UserListResult = User[];

export interface UserCreateParams {
  email: string;
  password: string;
}

export type UserCreateResult = User;
