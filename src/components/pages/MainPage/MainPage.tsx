import { useEffect } from 'react';
import cn from 'classnames/bind';
import { useIsAuth } from '@hooks/useIsAuth';
import { useThemeContext } from '@hooks/useThemeContext';
import { useLazyFetchArtistsQuery } from '@api/features';
import Layout from '@components/layout/Layout';
import Preloader from '@components/Preloader';
import PaintingsGrid from '@components/PaintingsGrid';
import MainPagePaintingCard from '@components/MainPagePaintingCard';
import AddArtistButton from './AddArtistButton';
import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

const MainPage = () => {
  const isAuth = useIsAuth();
  const { isDarkTheme } = useThemeContext();
  const [fetchArtists, { isLoading, data }] = useLazyFetchArtistsQuery();

  const isAuthStatusKnow = typeof isAuth === 'boolean';
  const shouldShowAddArtistButton = isAuthStatusKnow && isAuth && data;

  const artists = data?.artists;

  useEffect(() => {
    if (isAuthStatusKnow) {
      fetchArtists(isAuth, true);
    }
  }, [isAuthStatusKnow, isAuth, fetchArtists]);

  return (
    <Layout className={cx('main-page', { 'main-page--dark': isDarkTheme })}>
      <main
        className={cx('main-page__content', {
          'main-page__content--loading': isLoading,
          'main-page__content--auth-user': isAuth,
        })}
      >
        {shouldShowAddArtistButton && <AddArtistButton isDarkTheme={isDarkTheme} />}
        {isLoading ? (
          <div className={cx('main-page__preloader-wrapper')}>
            <Preloader />
          </div>
        ) : (
          <PaintingsGrid className={cx('main-page__paintings')}>
            {artists &&
              artists.map((artist) => (
                <li key={artist._id}>
                  <MainPagePaintingCard
                    isDarkTheme={isDarkTheme}
                    artistId={artist._id}
                    {...artist}
                  />
                </li>
              ))}
          </PaintingsGrid>
        )}
      </main>
    </Layout>
  );
};

export default MainPage;
