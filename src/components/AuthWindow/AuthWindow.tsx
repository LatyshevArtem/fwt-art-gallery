import { FC, PropsWithChildren } from 'react';
import cn from 'classnames/bind';
import Modal from '@components/Modal/Modal';
import ModalCloseButton from '@components/ModalCloseButton';
import TextButton from '@components/TextButton/TextButton';
import styles from './AuthWindow.module.scss';

const cx = cn.bind(styles);

type AuthWindowType = 'login' | 'signup';

const authWindowContentByType = {
  login: {
    welcomeMessage: 'Welcome back',
    buttonText: 'Log in',
  },
  signup: {
    welcomeMessage: 'Create your profile',
    buttonText: 'Sign up',
  },
};

interface AuthWindowProps extends PropsWithChildren {
  windowType: AuthWindowType;
  isDarkTheme?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const AuthWindow: FC<AuthWindowProps> = ({
  children,
  windowType,
  isDarkTheme,
  isOpen,
  onClose,
}) => {
  const { welcomeMessage, buttonText } = authWindowContentByType[windowType];

  return (
    <Modal
      backdropClassName={cx('auth-modal', { 'auth-modal--dark': isDarkTheme })}
      contentClassName={cx('auth-modal__content', `auth-modal__content--${windowType}`, {
        'auth-modal__content--dark': isDarkTheme,
      })}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={cx('content__right-col')}>
        <ModalCloseButton className={cx('content__close-button')} />
        <div className={cx('content__wrapper')}>
          <p className={cx('content__title', { 'content__title--dark': isDarkTheme })}>
            {welcomeMessage}
          </p>
          <form className={cx('content__form')}>
            <TextButton
              className={cx('form__submit-button')}
              isDarkTheme={isDarkTheme}
              type="submit"
            >
              {buttonText}
            </TextButton>
          </form>
          <small className={cx('content__caption', { 'content__caption--dark': isDarkTheme })}>
            {children}
          </small>
        </div>
      </div>
    </Modal>
  );
};

export default AuthWindow;
