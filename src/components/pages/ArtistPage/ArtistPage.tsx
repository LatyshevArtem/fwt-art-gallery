import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';
import { useIsAuth } from '@hooks/useIsAuth';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { useLazyFetchArtistByIdQuery } from '@api/features';
import Layout from '@components/layout/Layout';
import Link from '@components/Link';
import Preloader from '@components/Preloader';
import ArtistCard from '@components/ArtistCard';
import PaintingsGrid from '@components/PaintingsGrid';
import ArtistPagePaintingCard from '@components/ArtistPagePaintingCard';
import ViewPaintingsWindow from '@components/ViewPaintingsWindow';
import { ReactComponent as BackArrowIcon } from '@assets/icons/arrow.svg';
import EditArtistButton from './EditArtistButton';
import DeleteArtistButton from './DeleteArtistButton';
import AddPaintingButton from './AddPaintingButton';
import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

let slideNumber = 0;

const ArtistPage = () => {
  const [isViewPaintingsWindowOpen, setIsViewPaintingsWindowOpen] = useState(false);
  const { id } = useParams();
  const isAuth = useIsAuth();
  const { isDarkTheme } = useThemeContext();
  const { isMobile } = useMatchMedia();
  const [fetchArtistById, { data, isLoading }] = useLazyFetchArtistByIdQuery();

  const isAuthStatusKnow = typeof isAuth === 'boolean';
  const shouldShowEditButtons = isAuthStatusKnow && isAuth;

  const artist = data;

  const openViewPaintingsWindow = () => setIsViewPaintingsWindowOpen(true);
  const closeViewPaintingsWindow = () => setIsViewPaintingsWindowOpen(false);

  const handlePaintingCardClick = (paintingNumber: number) => {
    return () => {
      slideNumber = paintingNumber;
      openViewPaintingsWindow();
    };
  };

  useEffect(() => {
    if (isAuthStatusKnow && id) {
      fetchArtistById({ id, isAuth }, true);
    }
  }, [isAuthStatusKnow, id, isAuth, fetchArtistById]);

  return (
    <Layout className={cx('artist-page', { 'artist-page--dark': isDarkTheme })}>
      <main className={cx('artist-page__content', { 'artist-page__content--loading': isLoading })}>
        {isLoading || !artist ? (
          <Preloader />
        ) : (
          <>
            <div className={cx('artist-page__tools-bar')}>
              <Link className={cx('tools-bar__back-link')} isDarkTheme={isDarkTheme} to="..">
                <BackArrowIcon className={cx('back-link__icon')} />
                {!isMobile && <span className={cx('back-link__text')}>back</span>}
              </Link>
              {shouldShowEditButtons && (
                <div className={cx('tools-bar__edit-buttons')}>
                  <EditArtistButton isDarkTheme={isDarkTheme} artist={artist} />
                  <DeleteArtistButton isDarkTheme={isDarkTheme} artistId={artist._id} />
                </div>
              )}
            </div>
            <ArtistCard isDarkTheme={isDarkTheme} artist={artist} />
            <h1
              className={cx('artist-page__heading', {
                'artist-page__heading--dark': isDarkTheme,
                'artist-page__heading--auth-user': isAuth,
              })}
            >
              Artworks <span className="visually-hidden">by {artist.name}</span>
            </h1>
            {isAuth && <AddPaintingButton isDarkTheme={isDarkTheme} artistId={artist._id} />}
            {artist.paintings && (
              <PaintingsGrid className={cx('artist-page__paintings')}>
                {artist.paintings.map((painting, index) => (
                  <li key={painting._id}>
                    <ArtistPagePaintingCard
                      isAuth={isAuth}
                      isDarkTheme={isDarkTheme}
                      artistId={id as string}
                      painting={painting}
                      mainPaintingId={artist.mainPainting?._id || ''}
                      onClick={handlePaintingCardClick(index)}
                    />
                  </li>
                ))}
              </PaintingsGrid>
            )}
          </>
        )}
      </main>
      {isViewPaintingsWindowOpen && artist && (
        <ViewPaintingsWindow
          artistId={id as string}
          initialSlideNumber={slideNumber}
          paintings={artist.paintings}
          onClose={closeViewPaintingsWindow}
        />
      )}
    </Layout>
  );
};

export default ArtistPage;
