import { FC, useEffect } from 'react';
import cn from 'classnames/bind';
import { useMatchMedia } from '@hooks/useMatchMedia';
import Portal from '@components/Portal';
import IconButton from '@components/IconButton';
import { ReactComponent as SmallSizeCloseIcon } from '@assets/icons/close--small-size.svg';
import { ReactComponent as DefaultSizeCloseIcon } from '@assets/icons/close--default-size.svg';
import styles from './Toast.module.scss';

const cx = cn.bind(styles);

interface ToastProps {
  isDarkTheme?: boolean;
  isError?: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

const Toast: FC<ToastProps> = ({ isDarkTheme, isError = true, title, message, onClose }) => {
  const { isMobile } = useMatchMedia();

  useEffect(() => {
    setTimeout(onClose, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Portal>
      <div className={cx('toast', { 'toast--error': isError, 'toast--dark': isDarkTheme })}>
        <div className={cx('toast__text-content-wrapper')}>
          {!isMobile && title && (
            <div className={cx('toast__title', { 'toast__title--error': isError })}>{title}</div>
          )}
          <div className={cx('toast__message', { 'toast__message--dark': isDarkTheme })}>
            {message}
          </div>
        </div>
        <IconButton
          className={cx('toast__close-button', { 'toast__close-button--dark': isDarkTheme })}
          isDarkTheme={isDarkTheme}
          onClick={onClose}
        >
          {isMobile ? <SmallSizeCloseIcon /> : <DefaultSizeCloseIcon />}
        </IconButton>
      </div>
    </Portal>
  );
};

export default Toast;
