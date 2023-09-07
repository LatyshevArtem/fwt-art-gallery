import { useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { useIsAuth } from '@hooks/useIsAuth';
import { useThemeContext } from '@hooks/useThemeContext';
import { useLazyFetchArtistsQuery } from '@api/features';
import Layout from '@components/layout/Layout';
import TextButton from '@components/TextButton';
import Preloader from '@components/Preloader';
import PaintingsGrid from '@components/PaintingsGrid';
import Link from '@components/Link';
import PaintingCard from '@components/PaintingCard';
import EditArtistWindow from '@components/EditArtistWindow';
import { ReactComponent as PlusIcon } from '@assets/icons/plus.svg';
import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

const MainPage = () => {
  const [isEditArtistWindowOpen, setIsEditArtistWindowOpen] = useState(false);
  const isAuth = useIsAuth();
  const { isDarkTheme } = useThemeContext();
  const [fetchArtists, { isLoading, data }] = useLazyFetchArtistsQuery();

  const isAuthStatusKnow = typeof isAuth === 'boolean';
  const shouldShowAddArtistButton = isAuthStatusKnow && isAuth;

  const artists = data?.artists;

  const openEditArtistWindow = () => setIsEditArtistWindowOpen(true);
  const closeEditArtistWindow = () => setIsEditArtistWindowOpen(false);

  useEffect(() => {
    if (isAuthStatusKnow) {
      fetchArtists(isAuth, true);
    }
  }, [isAuthStatusKnow, isAuth, fetchArtists]);

  return (
    <Layout className={cx('main-page', { 'main-page--dark': isDarkTheme })}>
      <main className={cx('main-page__content', { 'main-page__content--loading': isLoading })}>
        {shouldShowAddArtistButton && (
          <TextButton
            className={cx('main-page__add-artist-button', {
              'main-page__add-artist-button--dark': isDarkTheme,
            })}
            isDarkTheme={isDarkTheme}
            onClick={openEditArtistWindow}
            isUnderlined
          >
            <PlusIcon />
            <span>Add artist</span>
          </TextButton>
        )}
        {isLoading ? (
          <Preloader />
        ) : (
          <PaintingsGrid className={cx('main-page__paintings')}>
            {artists &&
              artists.map((artist) => (
                <li key={artist._id}>
                  <Link className={cx('paintings__link')} to={`artists/${artist._id}`}>
                    <PaintingCard
                      isDarkTheme={isDarkTheme}
                      painting={artist.mainPainting.image}
                      name={artist.name}
                      date={artist.yearsOfLife}
                    />
                  </Link>
                </li>
              ))}
          </PaintingsGrid>
        )}
      </main>
      {isEditArtistWindowOpen && <EditArtistWindow onClose={closeEditArtistWindow} />}
    </Layout>
  );
};

export default MainPage;
