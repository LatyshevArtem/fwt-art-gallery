import { ComponentPropsWithoutRef, forwardRef } from 'react';
import cn from 'classnames/bind';
import { useFormControlContext } from '@components/FormControl/FormControl';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

interface InputProps extends ComponentPropsWithoutRef<'input'> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id: idProp, placeholder = 'Placeholder', ...props }, ref) => {
    const { isDarkTheme, id } = useFormControlContext();
    const inputId = idProp || id;

    return (
      <input
        className={cx('input', { 'input--dark': isDarkTheme })}
        ref={ref}
        placeholder={placeholder}
        id={inputId}
        {...props}
      />
    );
  },
);

export default Input;
