import { FC, HTMLAttributes } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as ErrorIcon } from '@assets/icons/error.svg';
import styles from './FormErrorMessage.module.scss';

const cx = cn.bind(styles);

interface FormErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  shouldShow: boolean;
  text?: string;
}

const FormErrorMessage: FC<FormErrorMessageProps> = ({ children, className, shouldShow, text }) => {
  return shouldShow ? (
    <div className={cx(className, 'form-error-message')}>
      {children || (
        <>
          <ErrorIcon />
          <span>{text || 'This is an error message!'}</span>
        </>
      )}
    </div>
  ) : null;
};

export default FormErrorMessage;
