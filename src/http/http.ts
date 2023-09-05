import axios, { InternalAxiosRequestConfig } from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

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

http.interceptors.request.use(handleRequestInterceptorSuccess);

export { http };
