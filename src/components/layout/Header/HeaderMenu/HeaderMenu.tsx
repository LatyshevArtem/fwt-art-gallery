import { FC, MouseEventHandler } from 'react';
import cn from 'classnames/bind';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectAuth } from '@store/features/auth/authSlice';
import ChangeThemeButton from '@components/ChangeThemeButton';
import TextButton from '@components/TextButton';
import LogoutButton from '@components/LogoutButton';
import styles from './HeaderMenu.module.scss';

const cx = cn.bind(styles);

interface HeaderMenuProps {
  isDarkTheme?: boolean;
  onLogInButtonClick: MouseEventHandler<HTMLButtonElement>;
  onSignUpButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const HeaderMenu: FC<HeaderMenuProps> = ({
  isDarkTheme,
  onLogInButtonClick,
  onSignUpButtonClick,
}) => {
  const isAuth = useAppSelector(selectAuth);

  const shouldShowLogoutButton = typeof isAuth === 'boolean' && isAuth;
  const shouldShowAuthButtons = typeof isAuth === 'boolean' && !isAuth;

  return (
    <div className={cx('menu', { 'menu--dark': isDarkTheme })}>
      <ChangeThemeButton />
      <ul className={cx('menu__user-nav')}>
        {shouldShowLogoutButton && (
          <li>
            <LogoutButton className={cx('user-nav__button')} />
          </li>
        )}
        {shouldShowAuthButtons && (
          <>
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
          </>
        )}
      </ul>
    </div>
  );
};

export default HeaderMenu;
