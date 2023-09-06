import cn from 'classnames/bind';
import { useIsAuth } from '@hooks/useIsAuth';
import { useThemeContext } from '@hooks/useThemeContext';
import { useFetchArtistsQuery } from '@api/features';
import Layout from '@components/layout/Layout';
import TextButton from '@components/TextButton/TextButton';
import Preloader from '@components/Preloader';
import PaintingsGrid from '@components/PaintingsGrid';
import Link from '@components/Link/Link';
import PaintingCard from '@components/PaintingCard';
import { ReactComponent as PlusIcon } from '@assets/icons/plus.svg';
import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

const MainPage = () => {
  const isAuth = useIsAuth();
  const { isDarkTheme } = useThemeContext();
  const { data: artists = [], isLoading } = useFetchArtistsQuery(null);

  const shouldShowAddArtistButton = typeof isAuth === 'boolean' && isAuth;

  return (
    <Layout className={cx('main-page', { 'main-page--dark': isDarkTheme })}>
      <main className={cx('main-page__content', { 'main-page__content--loading': isLoading })}>
        {shouldShowAddArtistButton && (
          <TextButton
            className={cx('main-page__add-artist-button', {
              'main-page__add-artist-button--dark': isDarkTheme,
            })}
            isDarkTheme={isDarkTheme}
            isUnderlined
          >
            <PlusIcon />
            <span>Add artist</span>
          </TextButton>
        )}
        {isLoading || !artists ? (
          <Preloader />
        ) : (
          artists && (
            <PaintingsGrid className={cx('main-page__paintings')}>
              {artists.map((artist) => (
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
          )
        )}
      </main>
    </Layout>
  );
};

export default MainPage;
