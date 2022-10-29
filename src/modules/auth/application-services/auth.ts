import { apiCall, setClientToken, removeClientToken } from '@/common/config';
import { UnauthorizedException } from '@/common/exceptions';
import {
  InfoResult,
  LoginParams,
  LoginResult,
} from '@/modules/auth/contracts/application-services';
import { getToken, saveToken, removeToken } from '@/modules/auth/repositories';

export async function loginAuthApplicationService(params: LoginParams) {
  const { bearerToken, ...result } = await apiCall<
    LoginParams,
    LoginResult & { bearerToken: string }
  >({
    method: 'post',
    url: '/sessions',
    body: params,
  });

  saveToken(bearerToken);
  setClientToken(bearerToken);

  return result;
}

export async function infoAuthApplicationService() {
  const token = getToken();
  if (!token) {
    throw new UnauthorizedException();
  }

  setClientToken(token);

  return apiCall<{}, InfoResult>({
    method: 'get',
    url: '/sessions',
  });
}

export function signOutAuthApplicationService() {
  removeClientToken();
  removeToken();
}
