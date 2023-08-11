import { FC } from 'react';
import cn from 'classnames/bind';
import { PageContentProps } from './PageContent.props';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const PageContent: FC<PageContentProps> = ({ children }) => {
  return <div className={cx('page-content')}>{children}</div>;
};

export default PageContent;
