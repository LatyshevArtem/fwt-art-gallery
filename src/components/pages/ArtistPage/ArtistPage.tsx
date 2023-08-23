import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '@hooks/useThemeContext';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import Layout from '@components/layout/Layout';
import cn from 'classnames/bind';
import ArtistCard from '@components/ArtistCard';
import PaintingsGrid from '@components/PaintingsGrid';
import PaintingCard from '@components/PaintingCard/PaintingCard';
import { fetchArtistById } from '../../../features/artistByIdSlice';
import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

const ArtistPage = () => {
  const { id } = useParams();
  const { isDarkTheme } = useThemeContext();
  const artist = useAppSelector((state) => state.artistById.artist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArtistById(id as string));
  }, [id, dispatch]);

  return (
    <Layout className={cx('artist-page', { 'artist-page--dark': isDarkTheme })}>
      <main className={cx('artist-page__main')}>
        {artist && <ArtistCard artist={artist} />}
        <h1 className={cx('artist-page__heading', { 'artist-page__heading--dark': isDarkTheme })}>
          Artworks <span className="visually-hidden">by {artist?.name}</span>
        </h1>
        {artist && (
          <PaintingsGrid className={cx('artist-page__paintings')}>
            {artist.paintings.map((painting) => {
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
        )}
      </main>
    </Layout>
  );
};

export default ArtistPage;
