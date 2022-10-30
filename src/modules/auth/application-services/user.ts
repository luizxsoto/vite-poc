import { apiService } from '@/common/services';
import {
  UserCreateParams,
  UserCreateResult,
  UserListParams,
  UserListResult,
  UserShowParams,
  UserShowResult,
  UserUpdateParams,
  UserUpdateResult,
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

export async function userShowApplicationService(params: UserShowParams) {
  const result = await apiService<UserShowParams, UserShowResult>({
    method: 'get',
    url: `/users/${params.id}`,
  });

  return formatSanitizer([result])[0];
}

export async function userUpdateApplicationService({
  id,
  ...params
}: UserUpdateParams) {
  const result = await apiService<
    Omit<UserUpdateParams, 'id'>,
    UserUpdateResult
  >({
    method: 'patch',
    url: `/users/${id}`,
    body: params,
  });

  return formatSanitizer([result])[0];
}
