import { apiCall } from '@/common/config';
import {
  LoginProps,
  LoginResponse,
} from '@/modules/auth/contracts/application-services';

export async function loginApplicationService(loginProps: LoginProps) {
  return apiCall<LoginProps, LoginResponse>({
    method: 'post',
    url: '/sessions',
    data: loginProps,
  });
}
