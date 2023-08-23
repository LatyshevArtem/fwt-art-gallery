import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import Layout from '@components/layout/Layout';
import cn from 'classnames/bind';
import Link from '@components/Link/Link';
import ArtistCard from '@components/ArtistCard';
import PaintingsGrid from '@components/PaintingsGrid';
import PaintingCard from '@components/PaintingCard/PaintingCard';
import Preloader from '@components/Preloader/Preloader';
import { ReactComponent as BackArrowIcon } from '@assets/icons/arrow.svg';
import { resetArtist, fetchArtistById } from '../../../features/artistByIdSlice';
import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const ArtistPage = () => {
  const { id } = useParams();
  const { isDarkTheme } = useThemeContext();
  const { isMobile } = useMatchMedia();
  const artist = useAppSelector((state) => state.artistById.artist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!artist) {
      dispatch(fetchArtistById(id as string));
      console.log('fetch');
    } else if (artist._id !== id) {
      dispatch(resetArtist());
      console.log('reset');
    }
  }, [id, artist, dispatch]);

  return (
    <Layout className={cx('artist-page', { 'artist-page--dark': isDarkTheme })}>
      <main className={cx('artist-page__main')}>
        {artist ? (
          <>
            <div className={cx('artist-page__back-link-wrapper')}>
              <Link className={cx('artist-page__back-link')} isDarkTheme={isDarkTheme} to="..">
                <BackArrowIcon className={cx('back-link__icon')} />
                {!isMobile && <span className={cx('back-link__text')}>back</span>}
              </Link>
            </div>
            <ArtistCard artist={artist} />
            <h1
              className={cx('artist-page__heading', { 'artist-page__heading--dark': isDarkTheme })}
            >
              Artworks <span className="visually-hidden">by {artist?.name}</span>
            </h1>
            <PaintingsGrid className={cx('artist-page__paintings')}>
              {artist!.paintings.map((painting) => {
                return (
                  <PaintingCard
                    isDarkTheme={isDarkTheme}
                    painting={painting.image}
                    name={painting.name}
                    date={painting.yearOfCreation}
                    key={painting._id}
                  />
                );
              })}
            </PaintingsGrid>
          </>
        ) : (
          <div className={cx('artist-page__preloader-wrapper')}>
            <Preloader />
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ArtistPage;
