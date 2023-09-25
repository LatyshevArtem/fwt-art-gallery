import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { AuthWindowType } from '@components/AuthWindow';
import Logo from '@components/Logo';
import { ReactComponent as BurgerMenuIcon } from '@assets/icons/menu-buger.svg';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import LogInWindow from '@components/LogInWindow';
import SignUpWindow from '@components/SignUpWindow';
import HeaderMenu from './HeaderMenu';
import styles from './Header.module.scss';

const cx = cn.bind(styles);

const ANIMATION_TIME = 500;

// let render = 0;

const getAppendSearchParamFunction = (
  searchParams: URLSearchParams,
  setSearchParams: (newSearchParams: URLSearchParams) => void,
) => {
  return (name: string, value: string) => {
    const newSearchParams = searchParams;
    newSearchParams.append(name, value);
    setSearchParams(newSearchParams);
  };
};

const getDeleteSearchParamFunction = (
  searchParams: URLSearchParams,
  setSearchParams: (newSearchParams: URLSearchParams) => void,
) => {
  return (name: string) => {
    const newSearchParams = searchParams;
    newSearchParams.delete(name);
    setSearchParams(newSearchParams);
  };
};

const Header: FC = () => {
  const [isSidePageOpen, setIsSidePageOpen] = useState(false);
  const [isSidePageMount, setIsSidePageMount] = useState(false);
  const [isLogInWindowOpen, setIsLogInWindowOpen] = useState(false);
  const [isSignUpWindowOpen, setIsSignUpWindowOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkTheme } = useThemeContext();
  const { isDesktop } = useMatchMedia();

  const openSidePage = () => setIsSidePageOpen(true);
  const closeSidePage = () => setIsSidePageOpen(false);

  const mountSidePage = () => setIsSidePageMount(true);
  const unmountSidePage = () => setIsSidePageMount(false);

  const appendSearchParam = getAppendSearchParamFunction(searchParams, setSearchParams);
  const deleteSearchParam = getDeleteSearchParamFunction(searchParams, setSearchParams);

  const openLogInWindow = () => setIsLogInWindowOpen(true);
  const closeLogInWindow = () => {
    deleteSearchParam('auth');
    setIsLogInWindowOpen(false);
  };

  const openSignUpWindow = () => setIsSignUpWindowOpen(true);
  const closeSignUpWindow = () => {
    deleteSearchParam('auth');
    setIsSignUpWindowOpen(false);
  };

  const handleAuthButtonClick = (button: AuthWindowType) => {
    return () => {
      closeSidePage();
      appendSearchParam('auth', button);
      if (button === 'login') {
        openLogInWindow();
      } else {
        openSignUpWindow();
      }
    };
  };

  useEffect(() => {
    const authWindowType = searchParams.get('auth') as AuthWindowType | null;
    if (authWindowType === 'login') {
      openLogInWindow();
    } else if (authWindowType === 'signup') {
      openSignUpWindow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <CSSTransition
            in={isSidePageOpen}
            timeout={ANIMATION_TIME}
            onEnter={mountSidePage}
            onExit={unmountSidePage}
            mountOnEnter
            unmountOnExit
          >
            <Modal onClose={closeSidePage}>
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
                    isDarkTheme={isDarkTheme}
                    onLogInButtonClick={handleAuthButtonClick('login')}
                    onSignUpButtonClick={handleAuthButtonClick('signup')}
                  />
                </ModalContent>
              </CSSTransition>
            </Modal>
          </CSSTransition>
        ) : (
          <HeaderMenu
            isDarkTheme={isDarkTheme}
            onLogInButtonClick={handleAuthButtonClick('login')}
            onSignUpButtonClick={handleAuthButtonClick('signup')}
          />
        )}
      </div>
      {isLogInWindowOpen && <LogInWindow onClose={closeLogInWindow} />}
      {isSignUpWindowOpen && <SignUpWindow onClose={closeSignUpWindow} />}
    </header>
  );
};

export default Header;
