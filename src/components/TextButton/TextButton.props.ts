import { ButtonHTMLAttributes } from 'react';

export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme?: boolean;
  isFilled: boolean;
  isIconRight?: boolean;
  isSmallIcon?: boolean;
  gap: 'small' | 'medium' | 'large';
  text: string;
}
