import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { ErrorResponse } from '@schemas/Error';
import { http } from './http';

export const axiosBaseQuery =
  <T>(): BaseQueryFn<AxiosRequestConfig, T, ErrorResponse> =>
  async (config: AxiosRequestConfig<T>) => {
    try {
      return await http(config);
    } catch (axiosError) {
      const { response } = axiosError as AxiosError<ErrorResponse>;

      return {
        error: {
          statusCode: response?.data.statusCode,
          message: response?.data.message,
        } as ErrorResponse,
      };
    }
  };
