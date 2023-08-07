import { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as GoUpButtonIcon } from '@assets/icons/up.svg';
import { GoUpButtonProps } from './GoUpButton.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const GoUpButton: FC<GoUpButtonProps> = ({ className, isDarkTheme, ...props }) => {
  return (
    <button className={cx(className, 'button', { 'button--dark': isDarkTheme })} {...props}>
      <GoUpButtonIcon />
    </button>
  );
};

export default GoUpButton;
