import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import FormControl from '@components/FormControl';
import FormLabel from '@components/FormLabel';
import Input from '@components/Input';
import TextButton from '@components/TextButton';
import styles from './AuthWindow.module.scss';

const cx = cn.bind(styles);

const authWindowContentByType = {
  login: {
    welcomeMessage: 'Welcome back',
    buttonText: 'Log in',
    captionText: "If you don't have an account yet, please",
    captionButtonText: 'sign up',
  },
  signup: {
    welcomeMessage: 'Create your profile',
    buttonText: 'Sign up',
    captionText: 'If you already have an account, please',
    captionButtonText: 'log in',
  },
};

interface AuthWindowProps {
  windowType: 'login' | 'signup';
  onChangeWindowType: () => void;
  onSubmit: (email: string, password: string) => void;
  onClose: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

const AuthWindow: FC<AuthWindowProps> = ({ windowType, onChangeWindowType, onSubmit, onClose }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
  });
  const { isDarkTheme } = useThemeContext();

  const { welcomeMessage, buttonText, captionText, captionButtonText } =
    authWindowContentByType[windowType];

  const onAuthFormSubmit: SubmitHandler<FormValues> = ({ email, password }) =>
    onSubmit(email, password);

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
          <p className={cx('auth-window__title', { 'auth-window__title--dark': isDarkTheme })}>
            {welcomeMessage}
          </p>
          <form className={cx('auth-window__form')} onSubmit={handleSubmit(onAuthFormSubmit)}>
            <FormControl className={cx('auth-window__form-control')} isDarkTheme={isDarkTheme}>
              <FormLabel>Email</FormLabel>
              <Input {...register('email')} type="email" />
            </FormControl>
            <FormControl className={cx('auth-window__form-control')} isDarkTheme={isDarkTheme}>
              <FormLabel>Password</FormLabel>
              <Input {...register('password')} type="password" />
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
            {captionText}&nbsp;
            <button
              className={cx('auth-window__change-window-button')}
              onClick={onChangeWindowType}
              type="button"
            >
              {captionButtonText}
            </button>
          </small>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AuthWindow;
