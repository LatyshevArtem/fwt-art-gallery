import { FC } from 'react';
import cn from 'classnames/bind';
import ChangeThemeButton from '@components/ChangeThemeButton';
import TextButton from '@components/TextButton';
import { MenuProps } from './Menu.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Menu: FC<MenuProps> = ({
  isDarkTheme,
  shouldShowButtonText,
  onChangeThemeButtonClick,
  onLogInButtonClick,
  onSignUpButtonClick,
}) => {
  return (
    <div className={cx('menu', { 'menu--dark': isDarkTheme })}>
      <ChangeThemeButton
        isDarkTheme={isDarkTheme}
        shouldShowButtonText={shouldShowButtonText}
        onClick={onChangeThemeButtonClick}
      />
      <ul className={cx('user-nav')}>
        <li>
          <TextButton
            className={cx('user-nav__button')}
            isDarkTheme={isDarkTheme}
            isFilled={false}
            text="Log in"
            onClick={onLogInButtonClick}
          />
        </li>
        <li>
          <TextButton
            className={cx('user-nav__button')}
            isDarkTheme={isDarkTheme}
            isFilled={false}
            text="Sign up"
            onClick={onSignUpButtonClick}
          />
        </li>
      </ul>
    </div>
  );
};

export default Menu;
