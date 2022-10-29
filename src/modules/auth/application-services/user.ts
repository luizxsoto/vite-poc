import { apiService } from '@/common/services';
import {
  UserCreateParams,
  UserCreateResult,
  UserListParams,
  UserListResult,
} from '@/modules/auth/contracts/application-services';

export async function userListApplicationService(params: UserListParams) {
  return apiService<UserListParams, UserListResult>({
    method: 'get',
    url: '/users',
    params: params,
  });
}

export async function userCreateApplicationService(params: UserCreateParams) {
  return apiService<UserCreateParams, UserCreateResult>({
    method: 'post',
    url: '/users',
    body: params,
  });
}
