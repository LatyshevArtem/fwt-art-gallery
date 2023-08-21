import { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import styles from './TextButton.module.scss';

const cx = cn.bind(styles);

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme?: boolean;
  isUnderlined?: boolean;
}

const TextButton: FC<TextButtonProps> = ({
  children,
  className,
  isDarkTheme,
  isUnderlined,
  ...props
}) => {
  return (
    <button
      className={cx(className, 'text-button', {
        'text-button--dark': isDarkTheme,
        'text-button--underlined': isUnderlined,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextButton;
