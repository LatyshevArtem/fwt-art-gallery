import { FC } from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './Link.module.scss';

const cx = cn.bind(styles);

interface LinkProps extends ReactRouterLinkProps {
  isDarkTheme?: boolean;
}

const Link: FC<LinkProps> = ({ children, className, isDarkTheme, ...props }) => {
  return (
    <ReactRouterLink className={cx(className, 'link', { 'link--dark': isDarkTheme })} {...props}>
      {children}
    </ReactRouterLink>
  );
};

export default Link;
