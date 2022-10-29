import { UserCreateParams } from '@/modules/auth/contracts/application-services';

export function createSanitizer(params: UserCreateParams): UserCreateParams {
  const sanitizeddData: UserCreateParams = {
    name: (params.name || '').trim(),
    email: (params.email || '').trim(),
    password: (params.password || '').trim(),
    role: (params.role || '').trim(),
  };

  return sanitizeddData;
}
