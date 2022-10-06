import { User } from '@/modules/auth/contracts/models';

export interface LoginProps {
  email: string;
  password: string;
}

export type LoginResponse = User;
