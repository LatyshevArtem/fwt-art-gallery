import { FC, HTMLAttributes, useContext } from 'react';
import cn from 'classnames/bind';
import { FormControlContext } from './FormControlContext';
import { FormControlProvider } from './FormControlProvider';
import styles from './FormContiol.module.scss';

const cx = cn.bind(styles);

const useFormControlContext = () => {
  const context = useContext(FormControlContext);

  return context;
};

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  isDarkTheme?: boolean;
}

const FormControl: FC<FormControlProps> = ({ children, className, isDarkTheme, ...props }) => {
  return (
    <FormControlProvider isDarkTheme={isDarkTheme}>
      <div className={cx(className, 'form-control')} {...props}>
        {children}
      </div>
    </FormControlProvider>
  );
};

export { useFormControlContext };
export default FormControl;
