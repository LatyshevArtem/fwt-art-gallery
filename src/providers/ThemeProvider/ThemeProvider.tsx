import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { ThemeContex } from '@contexts/ThemeContext';
import { getInitialIsDarkTheme } from './utils/getInitialIsDarkTheme';
import { DARK_COLOR_SCHEME, LIGHT_COLOR_SHEME } from './utils/consts';
import { saveColorScheme } from './utils/saveColorScheme';

interface ThemeProviderProps extends PropsWithChildren {}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialIsDarkTheme);

  const colorScheme = isDarkTheme ? DARK_COLOR_SCHEME : LIGHT_COLOR_SHEME;
  saveColorScheme(colorScheme);

  const toggleTheme = () => setIsDarkTheme((prevTheme) => !prevTheme);

  const values = useMemo(
    () => ({
      isDarkTheme,
      toggleTheme,
    }),
    [isDarkTheme],
  );

  return <ThemeContex.Provider value={values}>{children}</ThemeContex.Provider>;
};

export { ThemeProvider };
