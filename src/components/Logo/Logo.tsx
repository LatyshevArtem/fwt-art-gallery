import { FC } from 'react';
import cn from 'classnames/bind';
import Link from '@components/Link';
import { ReactComponent as LogoIcon } from '@assets/icons/logo.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

interface LogoProps {
  isDarkTheme?: boolean;
  to?: string;
}

const Logo: FC<LogoProps> = ({ isDarkTheme, to = '/' }) => {
  return (
    <Link to={to} isDarkTheme={isDarkTheme}>
      <LogoIcon className={cx('logo')} />
    </Link>
  );
};

export default Logo;
