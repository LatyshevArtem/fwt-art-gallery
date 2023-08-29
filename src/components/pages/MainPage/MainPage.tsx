import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { useFetchArtistsQuery } from '@api/features';
import Layout from '@components/layout/Layout/';
import PaintingsSection from '@components/PaintingsSection';
import Preloader from '@components/Preloader/Preloader';
import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

const MainPage = () => {
  const { isDarkTheme } = useThemeContext();
  const { data: artists = [], isLoading } = useFetchArtistsQuery(null);

  return (
    <Layout className={cx('main-page', { 'main-page--dark': isDarkTheme })}>
      <main className={cx('main-page__content', { 'main-page__content--loading': isLoading })}>
        {isLoading ? <Preloader /> : <PaintingsSection artists={artists} />}
      </main>
    </Layout>
  );
};

export default MainPage;
