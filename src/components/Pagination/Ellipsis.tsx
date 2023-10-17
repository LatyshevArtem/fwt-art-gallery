import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './Pagination.module.scss';

const cx = cn.bind(styles);

interface EllipsisProps {
  isDarkTheme?: boolean;
}

const Ellipsis: FC<EllipsisProps> = ({ isDarkTheme }) => {
  return (
    <li className={cx('pagination__ellipsis', { 'pagination__ellipsis--dark': isDarkTheme })}>
      &hellip;
    </li>
  );
};

export default Ellipsis;
