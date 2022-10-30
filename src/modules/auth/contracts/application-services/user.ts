import { OrderTypes } from '@/common/constants';
import { ListApplicationServiceResult } from '@/common/contracts';
import { User } from '@/modules/auth/contracts/models';

export type UserListOrderBy =
  | 'id'
  | 'name'
  | 'email'
  | 'role'
  | 'createdAt'
  | 'createdAtFormated';

export interface UserListParams {
  page?: number;
  perPage?: number;
  order?: OrderTypes;
  orderBy?: UserListOrderBy;
  name?: string;
  email?: string;
  role?: string;
}

export type UserListResult = ListApplicationServiceResult<
  User,
  UserListOrderBy
>;

export interface UserCreateParams {
  name: string;
  email: string;
  password: string;
  role: string;
}

export type UserCreateResult = User;
