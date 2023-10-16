import { FC } from 'react';
import cn from 'classnames/bind';
import { Painting } from '@schemas/Painting';
import { useBoolean } from '@hooks/useBoolean';
import {
  useChangeMainPaintingMutation,
  useDeletePaintingMutation,
  useEditPaintingMutation,
} from '@api/features';
import IconButton from '@components/IconButton';
import DropdownMenu, { DropdownMenuOptionType } from '@components/DropdownMenu';
import EditPaintingWindow from '@components/EditPaintingWindow';
import DeletionWindow from '@components/DeletionWindow';
import { ReactComponent as GearIcon } from '@assets/icons/gear.svg';
import styles from './ArtistPagePaintingCard.module.scss';

const cx = cn.bind(styles);

interface ContextMenuButtonProps {
  isDarkTheme?: boolean;
  isTheCover: boolean;
  artistId: string;
  painting: Painting;
}

const ContextMenuButton: FC<ContextMenuButtonProps> = ({
  isDarkTheme,
  isTheCover,
  artistId,
  painting: { _id: paintingId, ...restPaintingData },
}) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useBoolean();
  const [isEditPaintingWindowOpen, setIsEditPaintingWindowOpen] = useBoolean();
  const [isDeletionWindowOpen, setIsDeletionWindowOpen] = useBoolean();
  const [changeArtistMainPainting] = useChangeMainPaintingMutation();
  const [editPainting] = useEditPaintingMutation();
  const [deletePainting] = useDeletePaintingMutation();

  const makeTheCover = () =>
    changeArtistMainPainting({
      artistId,
      data: { mainPainting: paintingId },
    });

  const contextMenuOptions: DropdownMenuOptionType[] = [
    {
      name: 'Make the cover',
      onClick: () => {
        setIsContextMenuOpen.off();
        makeTheCover();
      },
    },
    {
      name: 'Edit',
      onClick: () => {
        setIsContextMenuOpen.off();
        setIsEditPaintingWindowOpen.on();
      },
    },
    {
      name: 'Delete',
      onClick: setIsDeletionWindowOpen.on,
    },
  ];
  if (isTheCover) {
    contextMenuOptions.shift();
  }

  const handleEditFormSubmit = (data: FormData) => editPainting({ artistId, paintingId, data });

  const handleDeletionFormSubmit = () => deletePainting({ artistId, paintingId });

  return (
    <>
      <IconButton
        className={cx('artist-page-painting-card__open-context-menu-button', {
          'artist-page-painting-card__open-context-menu-button--visible': isContextMenuOpen,
        })}
        isDarkTheme={isDarkTheme}
        onClick={setIsContextMenuOpen.on}
        isOverImage
      >
        <span className="visually-hidden">Open context menu</span>
        <GearIcon aria-hidden />
      </IconButton>
      {isContextMenuOpen && (
        <DropdownMenu
          className={cx('artist-page-painting-card__context-menu')}
          isDarkTheme={isDarkTheme}
          options={contextMenuOptions}
          onClose={setIsContextMenuOpen.off}
        />
      )}
      {isEditPaintingWindowOpen && (
        <EditPaintingWindow
          painting={{ _id: paintingId, ...restPaintingData }}
          onSubmit={handleEditFormSubmit}
          onClose={setIsEditPaintingWindowOpen.off}
        />
      )}
      {isDeletionWindowOpen && (
        <DeletionWindow
          confirmationText="Do you want to delete this picture?"
          warningText="You will not be able to recover this picture afterwards."
          onClose={setIsDeletionWindowOpen.off}
          onSubmit={handleDeletionFormSubmit}
        />
      )}
    </>
  );
};

export default ContextMenuButton;
