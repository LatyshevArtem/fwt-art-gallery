import { FC } from 'react';
import cn from 'classnames/bind';
import { TextButtonProps } from './TextButton.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const TextButton: FC<TextButtonProps> = ({
  children,
  className,
  isDarkTheme,
  isFilled = true,
  isIconRight,
  isSmallIcon,
  gap = 'small',
  text,
  ...props
}) => {
  return (
    <button
      className={cx(className, 'button', {
        'button--dark': isDarkTheme,
        'button--filled': isFilled,
        'button--underlined': !isFilled,
        'button--icon-right': isIconRight,
        'button--icon-small': isSmallIcon,
        [`button--gap-${gap}`]: Boolean(gap),
      })}
      {...props}
    >
      {children}
      <span>{text}</span>
    </button>
  );
};

export default TextButton;
