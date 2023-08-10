import { FC } from 'react';
import cn from 'classnames/bind';
import Link from '@components/Link';
import { ReactComponent as LogoIcon } from '@assets/icons/logo.svg';
import { LogoProps } from './Logo.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Logo: FC<LogoProps> = ({ isDarkTheme, isDesktop, href = '/' }) => {
  return (
    <Link href={href} isIconLink>
      <LogoIcon
        className={cx('logo', {
          'logo--desktop': isDesktop,
          'logo--dark': isDarkTheme,
        })}
      />
    </Link>
  );
};

export default Logo;
