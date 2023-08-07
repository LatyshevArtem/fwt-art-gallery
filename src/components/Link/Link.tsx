import { FC } from 'react';
import cn from 'classnames/bind';
import { LinkProps } from './Link.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Link: FC<LinkProps> = ({ children, className, isDarkTheme, ...props }) => {
  return (
    <a className={cx(className, 'link', { 'link--dark': isDarkTheme })} {...props}>
      {children}
    </a>
  );
};

export default Link;
