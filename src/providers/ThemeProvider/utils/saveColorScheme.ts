import { LIGHT_COLOR_SHEME, DARK_COLOR_SCHEME, COLOR_SCHEME_KEY } from './consts';

type Scheme = typeof LIGHT_COLOR_SHEME | typeof DARK_COLOR_SCHEME;

const saveColorScheme = (scheme: Scheme) => {
  localStorage.setItem(COLOR_SCHEME_KEY, scheme);
};

export { saveColorScheme };
