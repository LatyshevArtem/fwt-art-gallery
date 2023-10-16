import { ComponentPropsWithoutRef, forwardRef } from 'react';
import cn from 'classnames/bind';
import { useFormControlContext } from '@components/FormControl/FormControl';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

interface InputProps extends ComponentPropsWithoutRef<'input'> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id: idProp, ...props }, ref) => {
    const { isDarkTheme, id } = useFormControlContext();
    const inputId = idProp || id;

    return (
      <input
        className={cx(className, 'input', { 'input--dark': isDarkTheme })}
        ref={ref}
        id={inputId}
        {...props}
      />
    );
  },
);

export default Input;
