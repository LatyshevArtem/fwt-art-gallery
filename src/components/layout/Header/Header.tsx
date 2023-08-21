import { useState, FC } from 'react';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import Logo from '@components/Logo';
import { ReactComponent as BurgerMenuIcon } from '@assets/icons/menu-buger.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/close.svg';
import Modal from '@components/Modal';
import HeaderMenu from './HeaderMenu';
import styles from './Header.module.scss';

const cx = cn.bind(styles);

const Header: FC = () => {
  const { isDarkTheme } = useThemeContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDesktop } = useMatchMedia();

  const handleLogInButtonClick = () => {};
  const handleSignUpButtonClick = () => {};

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={cx('header', { 'header--dark': isDarkTheme })}>
      <div className={cx('header__container')}>
        <Logo isDarkTheme={isDarkTheme} />
        {!isDesktop && (
          <button className={cx('header__menu-button')} onClick={openMobileMenu}>
            <BurgerMenuIcon />
          </button>
        )}
        {!isDesktop ? (
          <Modal
            backdropClassName={cx('side-page', 'side-page-overlay', {
              'side-page--dark': isDarkTheme,
              'side-page--open': isMobileMenuOpen,
            })}
            contentClassName={cx('side-page__content')}
            onClose={closeMobileMenu}
            isOpen
          >
            <button className={cx('side-page__menu-button')} onClick={closeMobileMenu}>
              <CloseIcon />
            </button>
            <HeaderMenu
              isDarkTheme={isDarkTheme}
              onLogInButtonClick={handleLogInButtonClick}
              onSignUpButtonClick={handleSignUpButtonClick}
            />
          </Modal>
        ) : (
          <HeaderMenu
            isDarkTheme={isDarkTheme}
            onLogInButtonClick={handleLogInButtonClick}
            onSignUpButtonClick={handleSignUpButtonClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
