import { AnchorHTMLAttributes } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isDarkTheme?: boolean;
  isIconLink?: boolean;
}
