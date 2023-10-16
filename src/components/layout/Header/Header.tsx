import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames/bind';
import { useBoolean } from '@hooks/useBoolean';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import Logo from '@components/Logo';
import NameFilter from '@components/NameFilter';
import { ReactComponent as BurgerMenuIcon } from '@assets/icons/menu-buger.svg';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import SignUpWindow from '@components/SignUpWindow';
import LogInWindow from '@components/LogInWindow';
import HeaderMenu from './HeaderMenu';
import styles from './Header.module.scss';

const cx = cn.bind(styles);

const ANIMATION_TIME = 500;

const Header: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [openWindow, setOpenWindow] = useState(
    () => searchParams.get('auth') as 'login' | 'signup' | null,
  );

  const [isSidePageOpen, setIsSidePageOpen] = useBoolean();
  const [isSidePageMount, setIsSidePageMount] = useBoolean();
  const { isDarkTheme } = useThemeContext();
  const { isMobile, isDesktop } = useMatchMedia();

  const isLogInWindowOpen = openWindow === 'login';
  const isSignUpWindowOpen = openWindow === 'signup';

  const handleAuthButtonClick = (button: 'login' | 'signup') => {
    return () => {
      searchParams.set('auth', button);
      setSearchParams(searchParams);
      setOpenWindow(button);
    };
  };

  const handleCloseAuthWindow = () => {
    searchParams.delete('auth');
    setSearchParams(searchParams);
    setOpenWindow(null);
  };

  return (
    <>
      <header className={cx('header', { 'header--dark': isDarkTheme })}>
        <div className={cx('header__container')}>
          <Logo isDarkTheme={isDarkTheme} />
          {!isDesktop && (
            <div className={cx('header__container-right-col')}>
              {isMobile && <NameFilter isDarkTheme={isDarkTheme} />}
              <button className={cx('header__menu-button')} onClick={setIsSidePageOpen.on}>
                <BurgerMenuIcon />
              </button>
            </div>
          )}
          {!isDesktop ? (
            <CSSTransition
              in={isSidePageOpen}
              timeout={ANIMATION_TIME}
              onEnter={setIsSidePageMount.on}
              onExit={setIsSidePageMount.off}
              mountOnEnter
              unmountOnExit
            >
              <Modal onClose={setIsSidePageOpen.off}>
                <CSSTransition in={isSidePageMount} timeout={ANIMATION_TIME}>
                  <ModalBackdrop
                    className={cx('side-page-backdrop', {
                      'side-page-backdrop--active': isSidePageMount,
                      'side-page-backdrop--dark': isDarkTheme,
                    })}
                  />
                </CSSTransition>
                <CSSTransition in={isSidePageMount} timeout={ANIMATION_TIME}>
                  <ModalContent
                    className={cx('side-page', {
                      'side-page--dark': isDarkTheme,
                      'side-page--active': isSidePageMount,
                    })}
                  >
                    <ModalCloseButton className={cx('side-page__close-button')} />
                    <HeaderMenu
                      onLogInButtonClick={handleAuthButtonClick('login')}
                      onSignUpButtonClick={handleAuthButtonClick('signup')}
                      isDarkTheme={isDarkTheme}
                    />
                  </ModalContent>
                </CSSTransition>
              </Modal>
            </CSSTransition>
          ) : (
            <HeaderMenu
              onLogInButtonClick={handleAuthButtonClick('login')}
              onSignUpButtonClick={handleAuthButtonClick('signup')}
              isDarkTheme={isDarkTheme}
            />
          )}
        </div>
      </header>
      {isLogInWindowOpen && (
        <LogInWindow
          onChangeWindowType={handleAuthButtonClick('signup')}
          onClose={handleCloseAuthWindow}
        />
      )}
      {isSignUpWindowOpen && (
        <SignUpWindow
          onChangeWindowType={handleAuthButtonClick('login')}
          onClose={handleCloseAuthWindow}
        />
      )}
    </>
  );
};

export default Header;
