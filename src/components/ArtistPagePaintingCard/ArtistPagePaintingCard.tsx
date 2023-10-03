import { FC, useState } from 'react';
import cn from 'classnames/bind';
import { Painting } from '@schemas/Painting';
import {
  useChangeArtistMainPaintingMutation,
  useDeleteArtistPaintingMutation,
} from '@api/features';
import PaintingCard from '@components/PaintingCard';
import IconButton from '@components/IconButton';
import DropdownMenu, { DropdownMenuOptionType } from '@components/DropdownMenu';
import { ReactComponent as GearIcon } from '@assets/icons/gear.svg';
import EditPaintingWindow from '@components/EditPaintingWindow';
import DeletionWindow from '@components/DeletionWindow';
import styles from './ArtistPagePaintingCard.module.scss';

const cx = cn.bind(styles);

interface ArtistPagePaintingCardProps {
  isAuth: boolean | null;
  isDarkTheme?: boolean;
  isTheCover?: boolean;
  artistId: string;
  painting: Painting;
  onClickOpenViewPaintingsWindowButton: () => void;
}

const ArtistPagePaintingCard: FC<ArtistPagePaintingCardProps> = ({
  isAuth,
  isDarkTheme,
  isTheCover = false,
  artistId,
  painting,
  onClickOpenViewPaintingsWindowButton,
}) => {
  const { _id: paintingId, yearOfCreation, ...restPaintingData } = painting;

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isEditPaintingWindowOpen, setIsEditPaintingWindowOpen] = useState(false);
  const [isDeletionWindowOpen, setIsDeletionWindowOpen] = useState(false);
  const [changeArtistMainPainting] = useChangeArtistMainPaintingMutation();
  const [deleteArtistPainting] = useDeleteArtistPaintingMutation();

  const openEditPaintingWindow = () => setIsEditPaintingWindowOpen(true);
  const closeEditPaintingWindow = () => setIsEditPaintingWindowOpen(false);

  const openDeletionWindow = () => setIsDeletionWindowOpen(true);
  const closeDeletionWindow = () => setIsDeletionWindowOpen(false);

  const makeTheCover = () =>
    changeArtistMainPainting({
      artistId,
      data: { mainPainting: painting._id },
    });

  const contextMenuOptions: DropdownMenuOptionType[] = [
    {
      name: 'Make the cover',
      onClick: makeTheCover,
    },
    {
      name: 'Edit',
      onClick: openEditPaintingWindow,
    },
    {
      name: 'Delete',
      onClick: openDeletionWindow,
    },
  ];
  if (isTheCover) {
    contextMenuOptions.shift();
  }

  const openContextMenu = () => setIsContextMenuOpen(true);
  const closeContextMenu = () => setIsContextMenuOpen(false);

  return (
    <>
      <div className={cx('artist-page-painting-card')}>
        <PaintingCard isDarkTheme={isDarkTheme} date={yearOfCreation} {...restPaintingData} />
        <button
          className={cx('artist-page-painting-card__open-view-paintings-window-button')}
          onClick={onClickOpenViewPaintingsWindowButton}
        >
          Open full-screen painting viewing mode
        </button>
        {isAuth && (
          <IconButton
            className={cx('artist-page-painting-card__open-context-menu-button', {
              'artist-page-painting-card__open-context-menu-button--visible': isContextMenuOpen,
            })}
            isDarkTheme={isDarkTheme}
            onClick={openContextMenu}
            isOverImage
          >
            <span className="visually-hidden">Open context menu</span>
            <GearIcon aria-hidden />
          </IconButton>
        )}
        {isContextMenuOpen && (
          <DropdownMenu
            className={cx('artist-page-painting-card__context-menu')}
            isDarkTheme={isDarkTheme}
            options={contextMenuOptions}
            onClose={closeContextMenu}
          />
        )}
      </div>
      {isEditPaintingWindowOpen && (
        <EditPaintingWindow artistId={artistId} onClose={closeEditPaintingWindow} />
      )}
      {isDeletionWindowOpen && (
        <DeletionWindow
          confirmationText="Do you want to delete this picture?"
          warningText="You will not be able to recover this picture afterwards."
          onClose={closeDeletionWindow}
          onSubmit={() => deleteArtistPainting({ artistId, paintingId })}
        />
      )}
    </>
  );
};

export default ArtistPagePaintingCard;
