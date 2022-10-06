import { LoginProps } from '@/modules/auth/contracts/application-services';

export function loginSanitizer(loginProps: LoginProps): LoginProps {
  const sanitizeddData: LoginProps = {
    email: (loginProps.email || '').trim(),
    password: (loginProps.password || '').trim(),
  };

  return sanitizeddData;
}
