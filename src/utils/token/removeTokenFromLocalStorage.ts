import { TokenKey } from '@schemas/TokenKey';
import { removeFromLocalStorage } from '@utils/localStorage';

export const removeTokenFromLocalStorage = (tokenKey: TokenKey) => removeFromLocalStorage(tokenKey);
