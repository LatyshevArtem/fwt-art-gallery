import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { useModalContext } from '@components/Modal';
import { ReactComponent as CloseIcon } from '@assets/icons/close.svg';
import styles from './ModalCloseButton.module.scss';

const cx = cn.bind(styles);

interface ModalCloseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {}

const ModalCloseButton: FC<ModalCloseButtonProps> = ({ children, className, ...props }) => {
  const { isDarkTheme } = useThemeContext();
  const { onCloseButtonClick } = useModalContext();

  return (
    <button
      className={cx(className, 'modal-close-button', { 'modal-close-button--dark': isDarkTheme })}
      onClick={onCloseButtonClick}
      type="button"
      {...props}
    >
      {children || <CloseIcon />}
    </button>
  );
};

export default ModalCloseButton;
