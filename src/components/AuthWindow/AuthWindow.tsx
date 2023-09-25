import { ChangeEventHandler, FC, FormEventHandler, PropsWithChildren, useRef } from 'react';
import cn from 'classnames/bind';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import FormControl from '@components/FormControl';
import FormLabel from '@components/FormLabel';
import Input from '@components/Input';
import TextButton from '@components/TextButton/TextButton';
import styles from './AuthWindow.module.scss';

const cx = cn.bind(styles);

export type AuthWindowType = 'login' | 'signup';

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

interface AuthFormProps {
  email: string;
  onEmailChange: ChangeEventHandler<HTMLInputElement>;
  password: string;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onFormSubmit: FormEventHandler<HTMLFormElement>;
}

interface AuthWindowProps extends PropsWithChildren {
  windowType: AuthWindowType;
  isDarkTheme?: boolean;
  onClose: () => void;
  authFormProps: AuthFormProps;
}

const AuthWindow: FC<AuthWindowProps> = ({
  children,
  windowType,
  isDarkTheme,
  onClose,
  authFormProps,
}) => {
  const authWindowTitleRef = useRef<HTMLParagraphElement>(null);
  const { welcomeMessage, buttonText } = authWindowContentByType[windowType];
  const { email, onEmailChange, password, onPasswordChange, onFormSubmit } = authFormProps;

  return (
    <Modal onClose={onClose}>
      <ModalBackdrop
        className={cx('auth-window-backdrop', { 'auth-window-backdrop--dark': isDarkTheme })}
      />
      <ModalContent
        className={cx('auth-window', `auth-window--${windowType}`, {
          'auth-window--dark': isDarkTheme,
        })}
      >
        <ModalCloseButton className={cx('auth-window__close-button')} />
        <div className={cx('auth-window__main-content')}>
          <p
            className={cx('auth-window__title', { 'auth-window__title--dark': isDarkTheme })}
            ref={authWindowTitleRef}
          >
            {welcomeMessage}
          </p>
          <form className={cx('auth-window__form')} onSubmit={onFormSubmit}>
            <FormControl className={cx('auth-window__form-control')} isDarkTheme={isDarkTheme}>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={onEmailChange} type="email" />
            </FormControl>
            <FormControl className={cx('auth-window__form-control')} isDarkTheme={isDarkTheme}>
              <FormLabel>Password</FormLabel>
              <Input value={password} onChange={onPasswordChange} type="password" />
            </FormControl>
            <TextButton
              className={cx('auth-window__form-submit-button')}
              isDarkTheme={isDarkTheme}
              type="submit"
            >
              {buttonText}
            </TextButton>
          </form>
          <small
            className={cx('auth-window__caption', { 'auth-window__caption--dark': isDarkTheme })}
          >
            {children}
          </small>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AuthWindow;
