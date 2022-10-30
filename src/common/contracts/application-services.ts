import { OrderTypes } from '@/common/constants';

export interface ListApplicationServiceResult<Model = any, OrderBy = string> {
  page: number;
  perPage: number;
  lastPage: number;
  total: number;
  order: OrderTypes;
  orderBy: OrderBy;
  data: Model[];
}
