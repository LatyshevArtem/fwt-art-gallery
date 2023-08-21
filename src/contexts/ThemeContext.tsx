import { createContext } from 'react';

interface IThemeContext {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContex = createContext<IThemeContext>(null as unknown as IThemeContext);

export { ThemeContex };
