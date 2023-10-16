import { ComponentPropsWithoutRef, forwardRef } from 'react';
import cn from 'classnames/bind';
import { useFormControlContext } from '@components/FormControl/FormControl';
import styles from './Textarea.module.scss';

const cx = cn.bind(styles);

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const { isDarkTheme, id } = useFormControlContext();

  return (
    <textarea
      className={cx(className, 'textarea', { 'textarea--dark': isDarkTheme })}
      ref={ref}
      id={id}
      {...props}
    />
  );
});

export default Textarea;
