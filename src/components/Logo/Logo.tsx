import { FC } from 'react';
import cn from 'classnames/bind';
import Link from '@components/Link';
import { ReactComponent as LogoIcon } from '@assets/icons/logo.svg';
import styles from './Logo.module.scss';

const cx = cn.bind(styles);

interface LogoProps {
  isDarkTheme?: boolean;
  href?: string;
}

const Logo: FC<LogoProps> = ({ isDarkTheme, href = '/' }) => {
  return (
    <Link href={href} isIconLink>
      <LogoIcon
        className={cx('logo', {
          'logo--dark': isDarkTheme,
        })}
      />
    </Link>
  );
};

export default Logo;
