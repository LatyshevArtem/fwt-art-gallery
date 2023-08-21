import Layout from '@components/layout/Layout';
import cn from 'classnames/bind';
import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const ArtistPage = () => {
  return (
    <Layout className={cx('artist-page')}>
      <main />
    </Layout>
  );
};

export default ArtistPage;
