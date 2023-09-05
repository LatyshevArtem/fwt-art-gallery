import { setTokenToLocalStorage } from './setTokenToLocalStorage';

export const setTokensToLocalStorage = (accessToken: string, refreshToken: string) => {
  setTokenToLocalStorage('access_token', accessToken);
  setTokenToLocalStorage('refresh_token', refreshToken);
};
