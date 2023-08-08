import { FC } from 'react';
import cn from 'classnames/bind';
import { LinkProps } from './Link.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Link: FC<LinkProps> = ({ children, className, isDarkTheme, isIconLink, ...props }) => {
  return (
    <a
      className={cx(className, 'link', {
        'link--dark': isDarkTheme,
        'link--icon-link': isIconLink,
      })}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
