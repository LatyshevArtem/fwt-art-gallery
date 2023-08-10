import { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as LightThemeIcon } from '@assets/icons/light.svg';
import { ReactComponent as DarkThemeIcon } from '@assets/icons/dark.svg';
import { ChangeThemeButtonProps } from './ChangeThemeButton.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const ChangeThemeButton: FC<ChangeThemeButtonProps> = ({
  className,
  isDarkTheme,
  shouldShowButtonText,
  ...props
}) => {
  const text = isDarkTheme ? 'Light mode' : 'Dark mode';

  return (
    <button className={cx(className, 'button', { 'button--dark': isDarkTheme })} {...props}>
      <span className={cx('button__icon-wrapper')}>
        {isDarkTheme ? <LightThemeIcon /> : <DarkThemeIcon />}
      </span>
      {shouldShowButtonText && <span className={cx('button__text')}>{text}</span>}
    </button>
  );
};

export default ChangeThemeButton;
