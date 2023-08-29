import { useParams } from 'react-router-dom';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { useFetchArtistByIdQuery } from '@api/features';
import Layout from '@components/layout/Layout';
import cn from 'classnames/bind';
import Link from '@components/Link/Link';
import Preloader from '@components/Preloader';
import ArtistCard from '@components/ArtistCard';
import PaintingsGrid from '@components/PaintingsGrid';
import PaintingCard from '@components/PaintingCard/PaintingCard';
import { ReactComponent as BackArrowIcon } from '@assets/icons/arrow.svg';
import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const ArtistPage = () => {
  const { id } = useParams();
  const { isDarkTheme } = useThemeContext();
  const { isMobile } = useMatchMedia();
  const { data: artist, isLoading } = useFetchArtistByIdQuery(id as string);

  return (
    <Layout className={cx('artist-page', { 'artist-page--dark': isDarkTheme })}>
      <main className={cx('artist-page__content', { 'artist-page__content--loading': isLoading })}>
        {isLoading || !artist ? (
          <Preloader />
        ) : (
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
    </Layout>
  );
};

export default ArtistPage;
