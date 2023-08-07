import { ButtonHTMLAttributes } from 'react';

export interface TextButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme?: boolean;
  isIconRight?: boolean;
  isSmallIcon?: boolean;
  gap: 'small' | 'medium' | 'large';
  text: string;
}
