import { getTokenFromLocalStorage } from './getTokenFromLocalStorage';

export const getTokensFromLocalStorage = () => {
  const accessToken = getTokenFromLocalStorage('access_token');
  const refreshToken = getTokenFromLocalStorage('refresh_token');
  return {
    accessToken,
    refreshToken,
  };
};
