import { FC, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { AuthWindowType } from '@components/AuthWindow';
import Logo from '@components/Logo';
import { ReactComponent as BurgerMenuIcon } from '@assets/icons/menu-buger.svg';
import Modal from '@components/Modal';
import ModalCloseButton from '@components/ModalCloseButton';
import LogInWindow from '@components/LogInWindow';
import SignUpWindow from '@components/SignUpWindow';
import HeaderMenu from './HeaderMenu';
import styles from './Header.module.scss';

const cx = cn.bind(styles);

const Header: FC = () => {
  const [isSidePageOpen, setIsSidePageOpen] = useState(false);
  const [isLogInWindowOpen, setIsLogInWindowOpen] = useState(false);
  const [isSignUpWindowOpen, setIsSignUpWindowOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkTheme } = useThemeContext();
  const { isDesktop } = useMatchMedia();

  const openSidePage = () => setIsSidePageOpen(true);
  const closeSidePage = () => setIsSidePageOpen(false);

  const deleteSearchParam = useCallback(
    (name: string) => {
      searchParams.delete(name);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const appendSearchParam = (name: string, value: string) => {
    searchParams.append(name, value);
    setSearchParams(searchParams);
  };

  const openLogInWindow = () => setIsLogInWindowOpen(true);
  const closeLogInWindow = useCallback(() => {
    deleteSearchParam('auth');
    setIsLogInWindowOpen(false);
  }, [deleteSearchParam]);

  const openSignUpWindow = () => setIsSignUpWindowOpen(true);
  const closeSignUpWindow = useCallback(() => {
    deleteSearchParam('auth');
    setIsSignUpWindowOpen(false);
  }, [deleteSearchParam]);

  const handleAuthButtonClick = (button: AuthWindowType) => {
    return () => {
      closeSidePage();
      appendSearchParam('auth', button);
    };
  };

  useEffect(() => {
    const authWindowType = searchParams.get('auth') as AuthWindowType | null;
    if (authWindowType === 'login') {
      openLogInWindow();
    } else if (authWindowType === 'signup') {
      openSignUpWindow();
    }
  }, [searchParams]);

  return (
    <header className={cx('header', { 'header--dark': isDarkTheme })}>
      <div className={cx('header__container')}>
        <Logo isDarkTheme={isDarkTheme} />
        {!isDesktop && (
          <button className={cx('header__menu-button')} onClick={openSidePage}>
            <BurgerMenuIcon />
          </button>
        )}
        {!isDesktop ? (
          <Modal
            backdropClassName={cx('side-page', {
              'side-page--dark': isDarkTheme,
              'side-page--open': isSidePageOpen,
            })}
            contentClassName={cx('side-page__content')}
            onClose={closeSidePage}
            isOpen
          >
            <ModalCloseButton className={cx('side-page__menu-button')} />
            <HeaderMenu
              isDarkTheme={isDarkTheme}
              onLogInButtonClick={handleAuthButtonClick('login')}
              onSignUpButtonClick={handleAuthButtonClick('signup')}
            />
          </Modal>
        ) : (
          <HeaderMenu
            isDarkTheme={isDarkTheme}
            onLogInButtonClick={handleAuthButtonClick('login')}
            onSignUpButtonClick={handleAuthButtonClick('signup')}
          />
        )}
      </div>
      <LogInWindow isOpen={isLogInWindowOpen} onClose={closeLogInWindow} />
      <SignUpWindow isOpen={isSignUpWindowOpen} onClose={closeSignUpWindow} />
    </header>
  );
};

export default Header;
