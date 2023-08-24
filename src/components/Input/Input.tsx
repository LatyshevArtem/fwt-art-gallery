import { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import { useFormControlContext } from '@components/FormControl/FormControl';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isDarkTheme?: boolean;
}

const Input: FC<InputProps> = ({
  isDarkTheme,
  id: idProp,
  placeholder = 'Placeholder',
  ...props
}) => {
  const { id } = useFormControlContext();
  const inputId = idProp || id;

  return (
    <input
      className={cx('input', { 'input--dark': isDarkTheme })}
      placeholder={placeholder}
      id={inputId}
      {...props}
    />
  );
};

export default Input;
