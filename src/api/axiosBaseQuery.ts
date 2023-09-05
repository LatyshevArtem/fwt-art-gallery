import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { http } from '@http/http';

export const axiosBaseQuery =
  <T>(): BaseQueryFn<AxiosRequestConfig, T> =>
  async (config: AxiosRequestConfig<T>) => {
    try {
      return await http(config);
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return { error: error.response?.data };
    }
  };
