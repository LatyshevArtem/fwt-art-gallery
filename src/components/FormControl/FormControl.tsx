import { FC, HTMLAttributes, useContext } from 'react';
import cn from 'classnames/bind';
import { FormControlContext } from './FormControlContext';
import { FormControlProvider } from './FormControlProvider';
import styles from './FormContiol.module.scss';

const cx = cn.bind(styles);

const useFormControlContext = () => {
  const { id } = useContext(FormControlContext);

  return { id };
};

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {}

const FormControl: FC<FormControlProps> = ({ children, className, ...props }) => {
  return (
    <FormControlProvider>
      <div className={cx(className, 'form-control')} {...props}>
        {children}
      </div>
    </FormControlProvider>
  );
};

export { useFormControlContext };
export default FormControl;
