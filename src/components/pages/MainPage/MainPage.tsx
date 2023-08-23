import { useContext, useEffect } from 'react';
import cn from 'classnames/bind';
import { ThemeContex } from '@contexts/ThemeContext';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import Layout from '@components/layout/Layout/';
import PaintingsSection from '@components/PaintingsSection';
import { fetchArtists } from '../../../features/artistsSlice';
import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

const MainPage = () => {
  const { isDarkTheme } = useContext(ThemeContex);
  const artists = useAppSelector((state) => state.artists.artists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!artists) {
      dispatch(fetchArtists());
    }
  }, [artists, dispatch]);

  return (
    <Layout className={cx('main-page', { 'main-page--dark': isDarkTheme })}>
      <main>{artists && <PaintingsSection artists={artists} />}</main>
    </Layout>
  );
};

export default MainPage;
