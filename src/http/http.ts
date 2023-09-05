import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { AuthResponse } from '@schemas/AuthResponse';
import { setTokensToLocalStorage } from '@utils/token';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const getFingerprint = async () => {
  const fingerprint = await FingerprintJS.load();
  const { visitorId } = await fingerprint.get();
  return visitorId;
};

const handleRequestInterceptorSuccess = async (config: InternalAxiosRequestConfig) => {
  const newConfig = config;

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
