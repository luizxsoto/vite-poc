import { apiCall, setClientToken } from '@/common/config';
import {
  LoginParams,
  LoginResult,
} from '@/modules/auth/contracts/application-services';
import { saveToken } from '@/modules/auth/repositories';

export async function loginApplicationService(params: LoginParams) {
  const result = await apiCall<LoginParams, LoginResult>({
    method: 'post',
    url: '/sessions',
    body: params,
  });

  saveToken(result.bearerToken);
  setClientToken(result.bearerToken);

  return result;
}
