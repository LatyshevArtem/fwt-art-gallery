import { ButtonHTMLAttributes } from 'react';

export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme?: boolean;
  text: string;
}
