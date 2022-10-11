import { apiCall, setClientToken } from '@/common/config';
import {
  LoginProps,
  LoginResponse,
} from '@/modules/auth/contracts/application-services';
import { saveToken } from '@/modules/auth/repositories';

export async function loginApplicationService(loginProps: LoginProps) {
  const result = await apiCall<LoginProps, LoginResponse>({
    method: 'post',
    url: '/sessions',
    data: loginProps,
  });

  saveToken(result.bearerToken);
  setClientToken(result.bearerToken);

  return result;
}
