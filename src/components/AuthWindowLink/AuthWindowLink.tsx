import cn from 'classnames/bind';
import Link from '@components/Link';
import styles from './AuthWindowLink.module.scss';

const cx = cn.bind(styles);

const AuthWindowLink: typeof Link = (props) => {
  return <Link className={cx('auth-window-link')} {...props} />;
};

export default AuthWindowLink;
