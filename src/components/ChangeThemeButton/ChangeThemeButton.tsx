import { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as LightThemeIcon } from '@assets/icons/light.svg';
import { ReactComponent as DarkThemeIcon } from '@assets/icons/dark.svg';
import { ChangeThemeButtonProps } from './ChangeThemeButton.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const ChangeThemeButton: FC<ChangeThemeButtonProps> = ({ className, isDarkTheme, ...props }) => {
  return (
    <button className={cx(className, 'button', { 'button--dark': isDarkTheme })} {...props}>
      {isDarkTheme ? <LightThemeIcon /> : <DarkThemeIcon />}
    </button>
  );
};

export default ChangeThemeButton;
