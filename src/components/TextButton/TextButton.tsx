import { FC } from 'react';
import cn from 'classnames/bind';
import { TextButtonProps } from './TextButton.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const TextButton: FC<TextButtonProps> = ({ className, isDarkTheme, text, ...props }) => {
  return (
    <button
      className={cx(className, 'button', {
        'button--dark': isDarkTheme,
      })}
      {...props}
    >
      {text}
    </button>
  );
};

export default TextButton;
