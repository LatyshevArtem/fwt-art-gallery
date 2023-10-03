import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames/bind';
import { useIsAuth } from '@hooks/useIsAuth';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { useDeleteArtistByIdMutation, useLazyFetchArtistByIdQuery } from '@api/features';
import Layout from '@components/layout/Layout';
import Link from '@components/Link';
import IconButton from '@components/IconButton';
import Preloader from '@components/Preloader';
import ArtistCard from '@components/ArtistCard';
import TextButton from '@components/TextButton';
import PaintingsGrid from '@components/PaintingsGrid';
import ArtistPagePaintingCard from '@components/ArtistPagePaintingCard';
import EditArtistWindow from '@components/EditArtistWindow';
import EditPaintingWindow from '@components/EditPaintingWindow';
import ViewPaintingsWindow from '@components/ViewPaintingsWindow';
import DeletionWindow from '@components/DeletionWindow';
import { ReactComponent as BackArrowIcon } from '@assets/icons/arrow.svg';
import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete.svg';
import { ReactComponent as PlusIcon } from '@assets/icons/plus.svg';
import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

let slideNumber = 0;

const ArtistPage = () => {
  const [isEditArtistWindowOpen, setIsEditArtistWindowOpen] = useState(false);
  const [isEditPaintingWindowOpen, setIsEditPaintingWindowOpen] = useState(false);
  const [isViewPaintingsWindowOpen, setIsViewPaintingsWindowOpen] = useState(false);
  const [isDeletionWindowOpen, setIsDeletionWindowOpen] = useState(false);
  const { id } = useParams();
  const isAuth = useIsAuth();
  const { isDarkTheme } = useThemeContext();
  const { isMobile } = useMatchMedia();
  const [fetchArtistById, { data, isLoading }] = useLazyFetchArtistByIdQuery();
  const [deleteArtistById, { isSuccess }] = useDeleteArtistByIdMutation();

  const isAuthStatusKnow = typeof isAuth === 'boolean';
  const shouldShowEditButtons = isAuthStatusKnow && isAuth;

  const artist = data;

  const checkIsPaintingIsMainOne = (paintingId: string) => {
    let isMain = false;
    if (artist?.mainPainting) {
      isMain = artist.mainPainting._id === paintingId;
    }

    return isMain;
  };

  const openEditArtistWindow = () => setIsEditArtistWindowOpen(true);
  const closeEditArtistWindow = () => setIsEditArtistWindowOpen(false);

  const openEditPaintingWindow = () => setIsEditPaintingWindowOpen(true);
  const closeEditPaintingWindow = () => setIsEditPaintingWindowOpen(false);

  const openViewPaintingsWindow = () => setIsViewPaintingsWindowOpen(true);
  const closeViewPaintingsWindow = () => setIsViewPaintingsWindowOpen(false);

  const openDeletionWindow = () => setIsDeletionWindowOpen(true);
  const closeDeletionWindow = () => setIsDeletionWindowOpen(false);

  const handleOpenViewPaintingsWindowButtonClick = (paintingNumber: number) => {
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

  useEffect(() => {
    if (isSuccess) {
      closeDeletionWindow();
    }
  }, [isSuccess]);

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
                  <IconButton isDarkTheme={isDarkTheme} onClick={openEditArtistWindow}>
                    <EditIcon />
                  </IconButton>
                  <IconButton isDarkTheme={isDarkTheme} onClick={openDeletionWindow}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
            </div>
            <ArtistCard artist={artist} />
            <h1
              className={cx('artist-page__heading', {
                'artist-page__heading--dark': isDarkTheme,
                'artist-page__heading--auth-user': isAuth,
              })}
            >
              Artworks <span className="visually-hidden">by {artist.name}</span>
            </h1>
            {isAuth && (
              <TextButton
                className={cx('artist-page__add-painting-button')}
                isDarkTheme={isDarkTheme}
                onClick={openEditPaintingWindow}
                isUnderlined
              >
                <PlusIcon />
                <span>Add picture</span>
              </TextButton>
            )}
            {artist.paintings && (
              <PaintingsGrid className={cx('artist-page__paintings')}>
                {artist.paintings.map((painting, index) => (
                  <li key={painting._id}>
                    <ArtistPagePaintingCard
                      isAuth={isAuth}
                      isDarkTheme={isDarkTheme}
                      artistId={id as string}
                      painting={painting}
                      isTheCover={checkIsPaintingIsMainOne(painting._id)}
                      onClickOpenViewPaintingsWindowButton={handleOpenViewPaintingsWindowButtonClick(
                        index,
                      )}
                    />
                  </li>
                ))}
              </PaintingsGrid>
            )}
          </>
        )}
      </main>
      {isEditArtistWindowOpen && (
        <EditArtistWindow artist={artist} onClose={closeEditArtistWindow} />
      )}
      {isEditPaintingWindowOpen && artist && (
        <EditPaintingWindow artistId={artist._id} onClose={closeEditPaintingWindow} />
      )}
      {isViewPaintingsWindowOpen && artist && (
        <ViewPaintingsWindow
          artistId={id as string}
          slideNumberToStartView={slideNumber}
          paintings={artist.paintings}
          onClose={closeViewPaintingsWindow}
        />
      )}
      {isDeletionWindowOpen && (
        <DeletionWindow
          confirmationText="Do you want to delete this artist profile?"
          warningText="You will not be able to recover this profile afterwards."
          onClose={closeDeletionWindow}
          onSubmit={() => deleteArtistById(id as string)}
        />
      )}
    </Layout>
  );
};

export default ArtistPage;
