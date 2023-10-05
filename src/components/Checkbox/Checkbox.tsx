import { ChangeEventHandler, FC, InputHTMLAttributes, useId, useState } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as CheckedCheckboxIcon } from '@assets/icons/success.svg';
import styles from './Checkbox.module.scss';

const cx = cn.bind(styles);

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
  isDarkTheme?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
  children,
  className,
  isDarkTheme,
  checked = false,
  onChange,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const id = useId();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div>
      <input
        className="visually-hidden"
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        {...props}
      />
      <label
        className={cx(className, 'checkbox-label', { 'checkbox-label--dark': isDarkTheme })}
        htmlFor={id}
      >
        <span
          className={cx('checkbox-label__icon-box', {
            'checkbox-label__icon-box--dark': isDarkTheme,
          })}
        >
          {isChecked && (
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
