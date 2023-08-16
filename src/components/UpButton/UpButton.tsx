import { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { ReactComponent as UpButtonIcon } from '@assets/icons/up.svg';
import { scrollToTop } from './utils/scrollToTop';
import styles from './UpButton.module.scss';

const cx = cn.bind(styles);

interface UpButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const UpButton: FC<UpButtonProps> = ({ ...props }) => {
  const { isDarkTheme } = useThemeContext();

  return (
    <button
      className={cx('up-button', { 'up-button--dark': isDarkTheme })}
      onClick={scrollToTop}
      {...props}
    >
      <UpButtonIcon className={cx('up-button__icon')} />
    </button>
  );
};

export default UpButton;
