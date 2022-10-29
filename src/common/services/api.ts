import axios, { AxiosResponse, AxiosError } from 'axios';

import {
  ApplicationException,
  UnauthorizedException,
} from '@/common/exceptions';
import { getParsedException } from '@/common/helpers';
import { envConfig } from '@/common/config';

type ApiServiceParams<RequestData> = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  url: string;
  params?: RequestData;
  body?: RequestData;
  headers?: Record<string, unknown>;
  ignoreRefreshing?: boolean;
};

const axiosClient = axios.create({
  baseURL: envConfig.API_URL,
  timeout: 20000,
});

let isRefreshing = false;

let requestQueue: {
  call: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}[] = [];

export function consumeQueue(rejectAll = false) {
  isRefreshing = false;
  requestQueue.forEach(({ call, resolve, reject }) => {
    if (rejectAll) reject(new UnauthorizedException());
    else call().then(resolve).catch(reject);
  });
}

export function setIsRefreshing(value: boolean) {
  isRefreshing = value;
}

export function setClientToken(token: string) {
  axiosClient.defaults.headers.authorization = `Bearer ${token}`;
}

export function removeClientToken() {
  axiosClient.defaults.headers.authorization = null;
}

export async function apiService<RequestData, ResponseData>({
  method,
  url,
  params,
  body,
  headers,
  ignoreRefreshing,
}: ApiServiceParams<RequestData>): Promise<ResponseData> {
  async function call() {
    return axiosClient
      .request<
        ApiServiceParams<RequestData>['body'],
        AxiosResponse<ResponseData>
      >({
        method,
        url,
        params,
        data: body,
        headers: {
          ...axiosClient.defaults.headers,
          ...headers,
        } as Record<string, string>,
      })
      .then(res => res.data)
      .catch((error: AxiosError<ApplicationException>) => {
        throw getParsedException(
          (error.response?.data || error) as ApplicationException
        );
      });
  }
  if (isRefreshing && !ignoreRefreshing) {
    return new Promise((resolve, reject) => {
      requestQueue.push({
        call,
        resolve,
        reject,
      });
    });
  }
  return call();
}
