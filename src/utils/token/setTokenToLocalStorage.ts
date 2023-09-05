import { TokenKey } from '@schemas/TokenKey';
import { setToLocalStorage } from '@utils/localStorage';

export const setTokenToLocalStorage = (tokenKey: TokenKey, token: string) => {
  setToLocalStorage(tokenKey, token);
};
