import { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isDarkTheme?: boolean;
}

const Input: FC<InputProps> = ({ isDarkTheme, placeholder = 'Placeholder', ...props }) => {
  return (
    <input
      className={cx('input', { 'input--dark': isDarkTheme })}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
