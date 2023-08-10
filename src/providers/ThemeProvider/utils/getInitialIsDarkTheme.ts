import { getUserColorScheme } from './getUserColorScheme';
import { DARK_COLOR_SCHEME } from './consts';

const getInitialIsDarkTheme = () => {
  const userColorScheme = getUserColorScheme();
  const initialIsDarkTheme = userColorScheme === DARK_COLOR_SCHEME;
  return initialIsDarkTheme;
};

export { getInitialIsDarkTheme };
