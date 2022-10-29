import { UnauthorizedException } from '@/common/exceptions';
import {
  apiService,
  removeClientToken,
  setClientToken,
} from '@/common/services';
import {
  InfoResult,
  LoginParams,
  LoginResult,
} from '@/modules/auth/contracts/application-services';
import { getToken, saveToken, removeToken } from '@/modules/auth/repositories';

export async function loginAuthApplicationService(params: LoginParams) {
  const { bearerToken, ...result } = await apiService<
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

  return apiService<{}, InfoResult>({
    method: 'get',
    url: '/sessions',
    ignoreRefreshing: true,
  });
}

export function signOutAuthApplicationService() {
  removeClientToken();
  removeToken();
}
