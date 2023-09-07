import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';
import { useIsAuth } from '@hooks/useIsAuth';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { useLazyFetchArtistByIdQuery } from '@api/features';
import Layout from '@components/layout/Layout';
import Link from '@components/Link';
import IconButton from '@components/IconButton';
import Preloader from '@components/Preloader';
import ArtistCard from '@components/ArtistCard';
import PaintingsGrid from '@components/PaintingsGrid';
import PaintingCard from '@components/PaintingCard';
import ArtistDeletePopUp from '@components/ArtistDeletePopUp';
import { ReactComponent as BackArrowIcon } from '@assets/icons/arrow.svg';
import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete.svg';
import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const ArtistPage = () => {
  const [isArtistDeletePopUpOpen, setIsArtistDeletePopUpOpen] = useState(false);
  const { id } = useParams();
  const isAuth = useIsAuth();
  const { isDarkTheme } = useThemeContext();
  const { isMobile } = useMatchMedia();
  const [fetchArtistById, { data, isLoading }] = useLazyFetchArtistByIdQuery();

  const isAuthStatusKnow = typeof isAuth === 'boolean';
  const shouldShowEditButtons = isAuthStatusKnow && isAuth;

  const artist = data;

  const openArtistDeletePopUpOpen = () => setIsArtistDeletePopUpOpen(true);
  const closeArtistDeletePopUpOpen = () => setIsArtistDeletePopUpOpen(false);

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
                  <IconButton isDarkTheme={isDarkTheme}>
                    <EditIcon />
                  </IconButton>
                  <IconButton isDarkTheme={isDarkTheme} onClick={openArtistDeletePopUpOpen}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
            <ArtistCard artist={artist} />
            <h1
              className={cx('artist-page__heading', { 'artist-page__heading--dark': isDarkTheme })}
            >
              Artworks <span className="visually-hidden">by {artist.name}</span>
            </h1>
            {artist.paintings && (
              <PaintingsGrid className={cx('artist-page__paintings')}>
                {artist.paintings.map((painting) => (
                  <li key={painting._id}>
                    <PaintingCard
                      isDarkTheme={isDarkTheme}
                      painting={painting.image}
                      name={painting.name}
                      date={painting.yearOfCreation}
                    />
                  </li>
                ))}
              </PaintingsGrid>
            )}
          </>
        )}
      </main>
      {isArtistDeletePopUpOpen && (
        <ArtistDeletePopUp id={id as string} onClose={closeArtistDeletePopUpOpen} />
      )}
    </Layout>
  );
};

export default ArtistPage;
