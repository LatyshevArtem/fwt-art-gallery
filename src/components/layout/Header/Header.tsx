import { FC, useContext, useState } from 'react';
import cn from 'classnames/bind';
import Logo from '@components/Logo';
import { ReactComponent as ClosedMenuButtonIcon } from '@assets/icons/menu-buger.svg';
import { ThemeContex } from '@contexts/ThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import MobileMenu from './MobileMenu';
import Menu from './Menu';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Header: FC = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContex);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useMatchMedia();

  const shouldShowMobileMenu = isMobile || isTablet;

  const handleLogInButtonClick = () => {};
  const handleSignUpButtonClick = () => {};

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={cx('header', { 'header--dark': isDarkTheme })}>
      <div className={cx('container')}>
        <Logo isDarkTheme={isDarkTheme} />
        {shouldShowMobileMenu && (
          <button className={cx('menu-button')} onClick={openMobileMenu}>
            <ClosedMenuButtonIcon />
          </button>
        )}
        {shouldShowMobileMenu ? (
          <MobileMenu
            isDarkTheme={isDarkTheme}
            isOpen={isMobileMenuOpen}
            onCloseButtonClick={closeMobileMenu}
            onChangeThemeButtonClick={toggleTheme}
            onLogInButtonClick={handleLogInButtonClick}
            onSignUpButtonClick={handleSignUpButtonClick}
          />
        ) : (
          <Menu
            isDarkTheme={isDarkTheme}
            shouldShowButtonText={!isDesktop}
            onChangeThemeButtonClick={toggleTheme}
            onLogInButtonClick={handleLogInButtonClick}
            onSignUpButtonClick={handleSignUpButtonClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
