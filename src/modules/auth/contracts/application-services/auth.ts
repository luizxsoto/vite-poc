import { User } from '@/modules/auth/contracts/models';

export interface LoginParams {
  email: string;
  password: string;
}

export type LoginResult = User;

export type InfoResult = User;
