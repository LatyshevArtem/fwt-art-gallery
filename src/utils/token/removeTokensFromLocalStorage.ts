import { removeTokenFromLocalStorage } from './removeTokenFromLocalStorage';

export const removeTokensFromLocalStorage = () => {
  removeTokenFromLocalStorage('access_token');
  removeTokenFromLocalStorage('refresh_token');
};
