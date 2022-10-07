import axios, { AxiosResponse, AxiosError } from 'axios';

import { ApplicationException } from '@/common/exceptions';
import { getExceptionByName } from '@/common/helpers';

import { envConfig } from './env';

type ApiCallProps<RequestData> = {
  method: string;
  url: string;
  params?: Record<string, unknown>;
  data?: RequestData;
  headers?: Record<string, unknown>;
  timeout?: number;
};

const axiosClient = axios.create({
  baseURL: envConfig.API_URL,
  timeout: 20000,
});

export async function apiCall<RequestData, ResponseData>({
  method,
  url,
  params,
  data,
  headers,
  timeout,
}: ApiCallProps<RequestData>): Promise<ResponseData> {
  return await axiosClient
    .request<ApiCallProps<RequestData>['data'], AxiosResponse<ResponseData>>({
      method,
      url,
      params,
      data,
      headers: {
        ...axiosClient.defaults.headers,
        ...headers,
      } as Record<string, string>,
      timeout,
    })
    .then(res => res.data)
    .catch((error: AxiosError<ApplicationException>) => {
      throw getExceptionByName(error.response?.data || error);
    });
}
