import { useContext } from 'react';
import cn from 'classnames/bind';
import { ThemeContex } from '@contexts/ThemeContext';
import Link from '@components/Link';
import { ReactComponent as FacebookIcon } from '@assets/icons/facebook.svg';
import { ReactComponent as VKIcon } from '@assets/icons/vk.svg';
import { ReactComponent as InstagramIcon } from '@assets/icons/instagram.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Footer = () => {
  const { isDarkTheme } = useContext(ThemeContex);

  return (
    <footer className={cx('footer', { 'footer--dark': isDarkTheme })}>
      <div className={cx('footer__container')}>
        <div className={cx('footer__project-info')}>
          <p>
            The project implemented as part of an internship
            <br />
            for Frontend developers from the{' '}
            <Link
              className={cx('footer__company-link')}
              isDarkTheme={isDarkTheme}
              href="https://framework.team/"
            >
              Framework Team
            </Link>{' '}
            company
          </p>
          <p className={cx('footer__project-author')}>Latyshev Artem, 2023</p>
        </div>
        <address>
          <ul className={cx('footer__social-link-list')}>
            <li>
              <Link
                isDarkTheme={isDarkTheme}
                href="https://www.facebook.com/framework.team"
                isIconLink
              >
                <FacebookIcon className={cx('footer__social-link')} />
              </Link>
            </li>
            <li>
              <Link isDarkTheme={isDarkTheme} href="https://vk.com/frameworkteam" isIconLink>
                <VKIcon className={cx('footer__social-link')} />
              </Link>
            </li>
            <li>
              <Link isDarkTheme={isDarkTheme} href="/" isIconLink>
                <InstagramIcon className={cx('footer__social-link')} />
              </Link>
            </li>
          </ul>
        </address>
      </div>
    </footer>
  );
};

export default Footer;
