import { User } from '@/modules/auth/contracts/models';

export interface UserListParams {
  page?: number;
  perPage?: number;
  order?: 'asc' | 'desc';
  orderBy?: 'id' | 'name' | 'email' | 'role';
  name?: string;
  email?: string;
  role?: string;
}

export type UserListResult = {
  page: number;
  perPage: number;
  lastPage: number;
  total: number;
  order?: 'asc' | 'desc';
  orderBy?: 'id' | 'name' | 'email' | 'role';
  data: User[];
};

export interface UserCreateParams {
  name: string;
  email: string;
  password: string;
  role: string;
}

export type UserCreateResult = User;
