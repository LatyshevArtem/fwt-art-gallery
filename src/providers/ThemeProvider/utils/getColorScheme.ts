import { COLOR_SCHEME_KEY, DARK_COLOR_SCHEME, LIGHT_COLOR_SHEME } from './consts';
import { checkIsUserPrefersDarkColorScheme } from './checkIsUserPreferDarkColorScheme';

const getColorScheme = () => {
  let colorScheme = localStorage.getItem(COLOR_SCHEME_KEY);
  if (!colorScheme) {
    const isUserPrefersDarkColorScheme = checkIsUserPrefersDarkColorScheme();
    colorScheme = isUserPrefersDarkColorScheme ? DARK_COLOR_SCHEME : LIGHT_COLOR_SHEME;
  }

  return colorScheme;
};

export { getColorScheme };
