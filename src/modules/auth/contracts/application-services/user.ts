import { User } from '@/modules/auth/contracts/models';

export interface UserListParams {
  page?: number;
  perPage?: number;
  order?: 'asc' | 'desc';
  orderBy?: 'id' | 'email' | 'role';
  email?: string;
  role?: string;
}

export type UserListResult = {
  page: number;
  perPage: number;
  lastPage: number;
  total: number;
  order?: 'asc' | 'desc';
  orderBy?: 'id' | 'email' | 'role';
  data: User[];
};

export interface UserCreateParams {
  email: string;
  password: string;
}

export type UserCreateResult = User;
