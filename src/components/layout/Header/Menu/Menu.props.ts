import { ChangeThemeButtonProps } from '@components/ChangeThemeButton/ChangeThemeButton.props';
import { MouseEventHandler } from 'react';

export interface MenuProps extends ChangeThemeButtonProps {
  onChangeThemeButtonClick: MouseEventHandler<HTMLButtonElement>;
  onLogInButtonClick: MouseEventHandler<HTMLButtonElement>;
  onSignUpButtonClick: MouseEventHandler<HTMLButtonElement>;
}
