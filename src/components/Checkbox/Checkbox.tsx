import { FC, InputHTMLAttributes, useId } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as CheckedCheckboxIcon } from '@assets/icons/success.svg';
import styles from './Checkbox.module.scss';

const cx = cn.bind(styles);

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
  isDarkTheme?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ children, className, isDarkTheme, checked, ...props }) => {
  const id = useId();

  return (
    <div>
      <input className="visually-hidden" type="checkbox" id={id} checked={checked} {...props} />
      <label
        className={cx(className, 'checkbox-label', { 'checkbox-label--dark': isDarkTheme })}
        htmlFor={id}
      >
        <span
          className={cx('checkbox-label__icon-box', {
            'checkbox-label__icon-box--dark': isDarkTheme,
          })}
        >
          {checked && (
            <CheckedCheckboxIcon
              className={cx('checkbox-label__icon', { 'checkbox-label__icon--dark': isDarkTheme })}
            />
          )}
        </span>
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
