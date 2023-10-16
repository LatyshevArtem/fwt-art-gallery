import { FC } from 'react';
import cn from 'classnames/bind';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectAuth } from '@store/features/auth/authSlice';
import ChangeThemeButton from '@components/ChangeThemeButton';
import LogoutButton from '@components/LogoutButton';
import TextButton from '@components/TextButton';
import styles from './HeaderMenu.module.scss';

const cx = cn.bind(styles);

interface HeaderMenuProps {
  isDarkTheme?: boolean;
  onLogInButtonClick: () => void;
  onSignUpButtonClick: () => void;
}

const HeaderMenu: FC<HeaderMenuProps> = ({
  isDarkTheme,
  onLogInButtonClick,
  onSignUpButtonClick,
}) => {
  const isAuth = useAppSelector(selectAuth);

  const shouldShowAuthButtons = typeof isAuth === 'boolean' && !isAuth;

  return (
    <div className={cx('menu', { 'menu--dark': isDarkTheme })}>
      <ChangeThemeButton />
      <ul className={cx('menu__user-nav')}>
        {isAuth && (
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
