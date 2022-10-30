import { apiService } from '@/common/services';
import {
  UserCreateParams,
  UserCreateResult,
  UserListParams,
  UserListResult,
} from '@/modules/auth/contracts/application-services';
import { formatSanitizer } from '../sanitizers';

export async function userListApplicationService(params: UserListParams) {
  const { data, ...result } = await apiService<UserListParams, UserListResult>({
    method: 'get',
    url: '/users',
    params: params,
  });

  return { ...result, data: formatSanitizer(data) };
}

export async function userCreateApplicationService(params: UserCreateParams) {
  const result = await apiService<UserCreateParams, UserCreateResult>({
    method: 'post',
    url: '/users',
    body: params,
  });

  return formatSanitizer([result])[0];
}
