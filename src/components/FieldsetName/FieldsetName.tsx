import { FC, HTMLAttributes } from 'react';
import cn from 'classnames/bind';
import styles from './FieldsetName.module.scss';

const cx = cn.bind(styles);

interface FieldsetNameProps extends HTMLAttributes<HTMLDivElement> {
  isDarkTheme?: boolean;
  buttonLabel?: string;
  onClick: () => void;
}

const FieldsetName: FC<FieldsetNameProps> = ({
  children,
  className,
  isDarkTheme,
  buttonLabel,
  onClick,
  ...props
}) => {
  return (
    <div
      className={cx(className, 'fieldset-name', { 'fieldset-name--dark': isDarkTheme })}
      {...props}
    >
      {children}
      <button
        className={cx('fieldset-name__button')}
        type="button"
        aria-label={buttonLabel}
        onClick={onClick}
      />
    </div>
  );
};

export default FieldsetName;
