import { BASE_URL } from '../../../consts/consts';

export const getFullImageSrc = (relativePath: string) => `${BASE_URL}/${relativePath}`;
