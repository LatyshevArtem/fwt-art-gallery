import { FC, LabelHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import styles from './FormLabel.module.scss';

const cx = cn.bind(styles);

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  isDarkTheme?: boolean;
}

const FormLabel: FC<FormLabelProps> = ({ isDarkTheme, children, ...props }) => {
  return (
    <label className={cx('form-label', { 'form-label--dark': isDarkTheme })} {...props}>
      {children}
    </label>
  );
};

export default FormLabel;
