import { FC, MouseEventHandler } from 'react';
import cn from 'classnames/bind';
import ChangeThemeButton from '@components/ChangeThemeButton';
import TextButton from '@components/TextButton';
import styles from './HeaderMenu.module.scss';

const cx = cn.bind(styles);

export interface MenuProps {
  isDarkTheme?: boolean;
  onLogInButtonClick: MouseEventHandler<HTMLButtonElement>;
  onSignUpButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const HeaderMenu: FC<MenuProps> = ({ isDarkTheme, onLogInButtonClick, onSignUpButtonClick }) => {
  return (
    <div className={cx('menu', { 'menu--dark': isDarkTheme })}>
      <ChangeThemeButton />
      <ul className={cx('user-nav')}>
        <li>
          <TextButton
            className={cx('user-nav__button')}
            isDarkTheme={isDarkTheme}
            onClick={onLogInButtonClick}
            isUnderlined
          >
            Log in
          </TextButton>
        </li>
        <li>
          <TextButton
            className={cx('user-nav__button')}
            isDarkTheme={isDarkTheme}
            onClick={onSignUpButtonClick}
            isUnderlined
          >
            Sign up
          </TextButton>
        </li>
      </ul>
    </div>
  );
};

export default HeaderMenu;
