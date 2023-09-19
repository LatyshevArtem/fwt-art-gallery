import { FC } from 'react';
import cn from 'classnames/bind';
import { useMatchMedia } from '@hooks/useMatchMedia';
import Portal from '@components/Portal';
import IconButton from '@components/IconButton';
import { ReactComponent as ErrorIcon } from '@assets/icons/error.svg';
import { ReactComponent as SmallSizeCloseIcon } from '@assets/icons/close--small-size.svg';
import { ReactComponent as DefaultSizeCloseIcon } from '@assets/icons/close--default-size.svg';
import styles from './Toast.module.scss';

const cx = cn.bind(styles);

interface ToastProps {
  isDarkTheme?: boolean;
  title?: string;
  message: string;
  onCloseButtonClick: () => void;
}

const Toast: FC<ToastProps> = ({ isDarkTheme, title, message, onCloseButtonClick }) => {
  const { isMobile } = useMatchMedia();

  return (
    <Portal>
      <div className={cx('toast', { 'toast--dark': isDarkTheme })}>
        <div className={cx('toast__text-content-wrapper')}>
          <div className={cx('toast__title')}>
            <ErrorIcon className={cx('toast__error-icon')} />
            {!isMobile && <span>{title}</span>}
          </div>
          <div className={cx('toast__message', { 'toast__message--dark': isDarkTheme })}>
            {message}
          </div>
        </div>
        <IconButton
          className={cx('toast__close-button', { 'toast__close-button--dark': isDarkTheme })}
          isDarkTheme={isDarkTheme}
          onClick={onCloseButtonClick}
        >
          {isMobile ? <SmallSizeCloseIcon /> : <DefaultSizeCloseIcon />}
        </IconButton>
      </div>
    </Portal>
  );
};

export default Toast;
