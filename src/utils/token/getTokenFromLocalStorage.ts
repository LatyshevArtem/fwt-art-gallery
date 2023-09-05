import { TokenKey } from '@schemas/TokenKey';
import { getFromLocalStorage } from '@utils/localStorage';

export const getTokenFromLocalStorage = (tokenKey: TokenKey) => getFromLocalStorage(tokenKey);
