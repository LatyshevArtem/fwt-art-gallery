import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme?: boolean;
  isOverImage?: boolean;
}
