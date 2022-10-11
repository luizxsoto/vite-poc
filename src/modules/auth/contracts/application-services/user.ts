import { User } from '@/modules/auth/contracts/models';

export interface UserListProps {
  email?: string;
}

export type UserListResponse = User[];
