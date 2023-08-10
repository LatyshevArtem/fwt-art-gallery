import { FC, ReactNode, useMemo, useState } from 'react';
import { getInitialIsDarkTheme } from './utils/getInitialIsDarkTheme';
import { DARK_COLOR_SCHEME, LIGHT_COLOR_SHEME } from './utils/consts';
import { saveColorScheme } from './utils/saveColorScheme';
import { ThemeContex } from '../../contexts/ThemeContext';

interface IThemeProvider {
  children: ReactNode;
}

const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
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
