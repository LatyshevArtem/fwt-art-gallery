import { FC, HTMLAttributes } from 'react';
import cn from 'classnames/bind';
import styles from './FormContiol.module.scss';

const cx = cn.bind(styles);

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {}

const FormControl: FC<FormControlProps> = ({ children, className, ...props }) => {
  return (
    <div className={cx(className, 'form-control')} {...props}>
      {children}
    </div>
  );
};

export default FormControl;
