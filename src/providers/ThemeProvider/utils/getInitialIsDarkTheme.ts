import { getColorScheme } from './getColorScheme';
import { DARK_COLOR_SCHEME } from './consts';

const getInitialIsDarkTheme = () => {
  const colorScheme = getColorScheme();
  const initialIsDarkTheme = colorScheme === DARK_COLOR_SCHEME;
  return initialIsDarkTheme;
};

export { getInitialIsDarkTheme };
