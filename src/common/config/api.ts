import axios, { AxiosResponse, AxiosError } from 'axios';

import { ApplicationException } from '@/common/exceptions';
import { getExceptionByName } from '@/common/helpers';

import { envConfig } from './env';

type ApiCallParams<RequestData> = {
  method: string;
  url: string;
  params?: RequestData;
  body?: RequestData;
  headers?: Record<string, unknown>;
  timeout?: number;
};

const axiosClient = axios.create({
  baseURL: envConfig.API_URL,
  timeout: 20000,
});

export function setClientToken(token: string) {
  axiosClient.defaults.headers.authorization = `Bearer ${token}`;
}

export async function apiCall<RequestData, ResponseData>({
  method,
  url,
  params,
  body,
  headers,
  timeout,
}: ApiCallParams<RequestData>): Promise<ResponseData> {
  return await axiosClient
    .request<ApiCallParams<RequestData>['body'], AxiosResponse<ResponseData>>({
      method,
      url,
      params,
      data: body,
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
