import { apiCall } from '@/common/config';
import {
  UserListProps,
  UserListResponse,
} from '@/modules/auth/contracts/application-services';

export async function listUserApplicationService(listProps: UserListProps) {
  return apiCall<UserListProps, UserListResponse>({
    method: 'get',
    url: '/users',
    params: listProps,
  });
}
