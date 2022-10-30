import { UserCreateParams } from '@/modules/auth/contracts/application-services';
import { User } from '../contracts/models';

export function formatSanitizer(users: User[]): User[] {
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    createdAtFormated: new Date(user.createdAt).toLocaleString(),
  }));
}

export function createSanitizer(params: UserCreateParams): UserCreateParams {
  return {
    name: (params.name || '').trim(),
    email: (params.email || '').trim(),
    password: (params.password || '').trim(),
    role: (params.role || '').trim(),
  };
}
