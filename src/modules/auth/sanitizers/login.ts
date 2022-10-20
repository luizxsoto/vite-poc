import { LoginParams } from '@/modules/auth/contracts/application-services';

export function loginSanitizer(params: LoginParams): LoginParams {
  const sanitizeddData: LoginParams = {
    email: (params.email || '').trim(),
    password: (params.password || '').trim(),
  };

  return sanitizeddData;
}
