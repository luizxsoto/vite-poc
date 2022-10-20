import { apiCall } from '@/common/config';
import {
  UserCreateParams,
  UserCreateResult,
  UserListParams,
  UserListResult,
} from '@/modules/auth/contracts/application-services';

export async function userListApplicationService(params: UserListParams) {
  return apiCall<UserListParams, UserListResult>({
    method: 'get',
    url: '/users',
    params: params,
  });
}

export async function userCreateApplicationService(params: UserCreateParams) {
  return apiCall<UserCreateParams, UserCreateResult>({
    method: 'post',
    url: '/users',
    body: params,
  });
}
