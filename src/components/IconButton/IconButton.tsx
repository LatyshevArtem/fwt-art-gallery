import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames/bind';
import styles from './IconButton.module.scss';

const cx = cn.bind(styles);

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme?: boolean;
  isOverImage?: boolean;
}

const IconButton: FC<IconButtonProps> = ({
  className,
  isDarkTheme,
  isOverImage,
  children,
  ...props
}) => {
  return (
    <button
      className={cx(className, 'button', {
        'button--dark': isDarkTheme,
        'button--over-image': isOverImage,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
