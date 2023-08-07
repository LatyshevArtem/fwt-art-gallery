import { FC } from 'react';
import cn from 'classnames/bind';
import { TextButtonWithIconProps } from './TextButtonWithIcon.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const TextButtonWithIcon: FC<TextButtonWithIconProps> = ({
  children,
  className,
  isDarkTheme,
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

export default TextButtonWithIcon;
