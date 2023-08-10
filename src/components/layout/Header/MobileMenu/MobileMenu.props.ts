import { MouseEventHandler } from 'react';
import { MenuProps } from '../Menu/Menu.props';

export interface MobileMenuProps extends Omit<MenuProps, 'shouldShowButtonText'> {
  isOpen: boolean;
  onCloseButtonClick: MouseEventHandler<HTMLButtonElement>;
}
