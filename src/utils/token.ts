import { TokenKey } from '@schemas/TokenKey';
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from './localStorage';

export const getTokenFromLocalStorage = (tokenKey: TokenKey) => getFromLocalStorage(tokenKey);

export const getTokensFromLocalStorage = () => {
  const accessToken = getTokenFromLocalStorage('access_token');
  const refreshToken = getTokenFromLocalStorage('refresh_token');
  return {
    accessToken,
    refreshToken,
  };
};

export const removeTokenFromLocalStorage = (tokenKey: TokenKey) => removeFromLocalStorage(tokenKey);

export const removeTokensFromLocalStorage = () => {
  removeTokenFromLocalStorage('access_token');
  removeTokenFromLocalStorage('refresh_token');
};

export const setTokenToLocalStorage = (tokenKey: TokenKey, token: string) => {
  setToLocalStorage(tokenKey, token);
};

export const setTokensToLocalStorage = (accessToken: string, refreshToken: string) => {
  setTokenToLocalStorage('access_token', accessToken);
  setTokenToLocalStorage('refresh_token', refreshToken);
};
