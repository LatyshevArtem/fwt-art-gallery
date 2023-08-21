import { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { ReactComponent as LightThemeIcon } from '@assets/icons/light.svg';
import { ReactComponent as DarkThemeIcon } from '@assets/icons/dark.svg';
import styles from './ChangeThemeButton.module.scss';

const cx = cn.bind(styles);

interface ChangeThemeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ChangeThemeButton: FC<ChangeThemeButtonProps> = ({ ...props }) => {
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const { isDesktop } = useMatchMedia();
  const text = isDarkTheme ? 'Light mode' : 'Dark mode';

  return (
    <button
      className={cx('change-theme-button', { 'change-theme-button--dark': isDarkTheme })}
      onClick={toggleTheme}
      {...props}
    >
      <span className={cx('change-theme-button__icon-wrapper')}>
        {isDarkTheme ? <LightThemeIcon /> : <DarkThemeIcon />}
      </span>
      {!isDesktop && <span className={cx('change-theme-button__text')}>{text}</span>}
    </button>
  );
};

export default ChangeThemeButton;
