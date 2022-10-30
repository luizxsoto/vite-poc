import { LoginParams } from '@/modules/auth/contracts/application-services';

export function loginSanitizer(params: LoginParams): LoginParams {
  return {
    email: (params.email || '').trim(),
    password: (params.password || '').trim(),
  };
}
