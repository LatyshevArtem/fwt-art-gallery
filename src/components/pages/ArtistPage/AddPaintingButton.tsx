import { FC, useEffect } from 'react';
import cn from 'classnames/bind';
import { useBoolean } from '@hooks/useBoolean';
import { useAddPaintingMutation } from '@api/features';
import TextButton from '@components/TextButton';
import EditPaintingWindow from '@components/EditPaintingWindow';
import Toast from '@components/Toast';
import { ReactComponent as PlusIcon } from '@assets/icons/plus.svg';
import styles from './ArtistPage.module.scss';

const cx = cn.bind(styles);

interface AddPaintingButtonProps {
  isDarkTheme?: boolean;
  artistId: string;
}

const AddPaintingButton: FC<AddPaintingButtonProps> = ({ isDarkTheme, artistId }) => {
  const [isEditPaintingWindowOpen, setIsEditPaintingWindowOpen] = useBoolean();
  const [isToastOpen, setIsToastOpen] = useBoolean();
  const [addPainting, { isSuccess, isError, error }] = useAddPaintingMutation();

  const toastMessage = isSuccess ? 'Painting added' : error?.message;

  const handleSubmit = (data: FormData) => addPainting({ artistId, data });

  useEffect(() => {
    if (isSuccess || isError) {
      setIsToastOpen.on();
    }

    if (isSuccess) {
      setIsEditPaintingWindowOpen.off();
    }
  }, [isSuccess, isError, setIsToastOpen, setIsEditPaintingWindowOpen]);

  return (
    <>
      <TextButton
        className={cx('artist-page__add-painting-button')}
        isDarkTheme={isDarkTheme}
        onClick={setIsEditPaintingWindowOpen.on}
        isUnderlined
      >
        <PlusIcon />
        <span>Add picture</span>
      </TextButton>
      {isEditPaintingWindowOpen && (
        <EditPaintingWindow onSubmit={handleSubmit} onClose={setIsEditPaintingWindowOpen.off} />
      )}
      {isToastOpen && (
        <Toast
          isDarkTheme={isDarkTheme}
          isError={isError}
          message={toastMessage}
          onClose={setIsToastOpen.off}
        />
      )}
    </>
  );
};

export default AddPaintingButton;
