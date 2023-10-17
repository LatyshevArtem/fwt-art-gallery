import { FC, LabelHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import { useFormControlContext } from '@components/FormControl/FormControl';
import styles from './FormLabel.module.scss';

const cx = cn.bind(styles);

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const FormLabel: FC<FormLabelProps> = ({ children, className, htmlFor, ...props }) => {
  const { isDarkTheme, id } = useFormControlContext();
  const labelHtmlFor = htmlFor || id;

  return (
    <label
      className={cx(className, 'form-label', { 'form-label--dark': isDarkTheme })}
      htmlFor={labelHtmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default FormLabel;
