import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AuthResponse } from '@schemas/AuthResponse';
import { getTokenFromLocalStorage, setTokensToLocalStorage } from '@utils/token';
import { getFingerprint } from './getFingerprint';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const handleRequestInterceptorSuccess = async (config: InternalAxiosRequestConfig) => {
  const newConfig = config;

  if (config.method === 'get' || config.method === 'delete') {
    const accessToken = getTokenFromLocalStorage('access_token');
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  if (config.method === 'post' && config.url?.includes('auth')) {
    const fingerprint = await getFingerprint();
    newConfig.data.fingerprint = fingerprint;
  }

  return newConfig;
};

const handleResponseInterceptorSuccess = (response: AxiosResponse<AuthResponse>) => {
  if (response.config.method === 'post' && response.config.url?.includes('auth')) {
    const { accessToken, refreshToken } = response.data;
    setTokensToLocalStorage(accessToken, refreshToken);
  }
  return response;
};

http.interceptors.request.use(handleRequestInterceptorSuccess);
http.interceptors.response.use(handleResponseInterceptorSuccess);

export { http };
