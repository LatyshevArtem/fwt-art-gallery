import { FC } from 'react';
import { useBoolean } from '@hooks/useBoolean';
import { useDeletePaintingMutation } from '@api/features';
import IconButton from '@components/IconButton';
import DeletionWindow from '@components/DeletionWindow';
import { ReactComponent as EditIcon } from '@assets/icons/delete--default-size.svg';
import { useViewPaintingsWindowContext } from '../ViewPaintingsWindowContext';

interface DeletePaintingButtonProps {
  className?: string;
  isOverImage?: boolean;
  paintingId: string;
}

const DeletePaintingButton: FC<DeletePaintingButtonProps> = ({
  className,
  isOverImage = true,
  paintingId,
}) => {
  const [isDeletionWindowOpen, setIsDeletionWindowOpen] = useBoolean();
  const { artistId, setShouldAttachHandlerOutsideEventsToRootModal } =
    useViewPaintingsWindowContext();
  const [deleteArtistPainting] = useDeletePaintingMutation();

  const handleClick = () => {
    setIsDeletionWindowOpen.on();
    setShouldAttachHandlerOutsideEventsToRootModal.off();
  };

  const submitDeletionForm = () => deleteArtistPainting({ artistId, paintingId });

  const handleCloseDeletionWindow = () => {
    setIsDeletionWindowOpen.off();
    setShouldAttachHandlerOutsideEventsToRootModal.on();
  };

  return (
    <>
      <IconButton className={className} onClick={handleClick} isOverImage={isOverImage}>
        <EditIcon />
      </IconButton>
      {isDeletionWindowOpen && (
        <DeletionWindow
          confirmationText="Do you want to delete this picture?"
          warningText="You will not be able to recover this picture afterwards."
          onSubmit={submitDeletionForm}
          onClose={handleCloseDeletionWindow}
        />
      )}
    </>
  );
};

export default DeletePaintingButton;
