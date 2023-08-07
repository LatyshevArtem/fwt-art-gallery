import { ButtonHTMLAttributes } from 'react';

export interface ChangeThemeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme?: boolean;
}
