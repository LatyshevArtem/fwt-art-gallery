import { FC, useEffect } from 'react';
import { Painting } from '@schemas/Painting';
import { useBoolean } from '@hooks/useBoolean';
import { useEditPaintingMutation } from '@api/features';
import IconButton from '@components/IconButton';
import EditPaintingWindow from '@components/EditPaintingWindow';
import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { useViewPaintingsWindowContext } from '../ViewPaintingsWindowContext';

interface EditPaintingButtonProps {
  className?: string;
  isOverImage?: boolean;
  painting: Painting;
}

const EditPaintingButton: FC<EditPaintingButtonProps> = ({
  className,
  isOverImage = true,
  painting,
}) => {
  const [isEditPaintingWindowOpen, setIsEditPaintingWindowOpen] = useBoolean();
  const { artistId, setShouldAttachHandlerOutsideEventsToRootModal } =
    useViewPaintingsWindowContext();
  const [editPainting, { isSuccess }] = useEditPaintingMutation();

  const handleClick = () => {
    setIsEditPaintingWindowOpen.on();
    setShouldAttachHandlerOutsideEventsToRootModal.off();
  };

  const handleSubmit = (data: FormData) =>
    editPainting({ artistId, paintingId: painting._id, data });

  const handleCloseEditPaintingWindow = () => {
    setIsEditPaintingWindowOpen.off();
    setShouldAttachHandlerOutsideEventsToRootModal.on();
  };

  useEffect(() => {
    if (isSuccess) {
      setIsEditPaintingWindowOpen.off();
      setShouldAttachHandlerOutsideEventsToRootModal.on();
    }
  }, [isSuccess, setIsEditPaintingWindowOpen, setShouldAttachHandlerOutsideEventsToRootModal]);

  return (
    <>
      <IconButton className={className} onClick={handleClick} isOverImage={isOverImage}>
        <EditIcon />
      </IconButton>
      {isEditPaintingWindowOpen && (
        <EditPaintingWindow
          painting={painting}
          onSubmit={handleSubmit}
          onClose={handleCloseEditPaintingWindow}
        />
      )}
    </>
  );
};

export default EditPaintingButton;
