import { useContext } from 'react';
import { ThemeContex } from '@contexts/ThemeContext';

export const useThemeContext = () => useContext(ThemeContex);
