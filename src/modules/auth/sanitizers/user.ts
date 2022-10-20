import { UserCreateParams } from '@/modules/auth/contracts/application-services';

export function createSanitizer(params: UserCreateParams): UserCreateParams {
  const sanitizeddData: UserCreateParams = {
    email: (params.email || '').trim(),
    password: (params.password || '').trim(),
  };

  return sanitizeddData;
}
