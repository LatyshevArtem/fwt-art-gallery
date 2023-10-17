import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoolean } from '@hooks/useBoolean';
import { useDeleteArtistByIdMutation } from '@api/features';
import IconButton from '@components/IconButton';
import DeletionWindow from '@components/DeletionWindow';
import Toast from '@components/Toast';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete.svg';

interface DeleteArtistButtonProps {
  isDarkTheme?: boolean;
  artistId: string;
}

const DeleteArtistButton: FC<DeleteArtistButtonProps> = ({ isDarkTheme, artistId }) => {
  const [isDeletionWindowOpen, setIsDeletionWindowOpen] = useBoolean();
  const [isToastOpen, setIsToastOpen] = useBoolean();
  const [deleteArtistById, { isSuccess, isError, error }] = useDeleteArtistByIdMutation();
  const navigate = useNavigate();

  const toastMessage = isSuccess ? 'The artist has been successfully deleted' : error?.message;

  useEffect(() => {
    if (isSuccess || isError) {
      setIsToastOpen.on();
      navigate('/');
    }
  }, [isSuccess, isError, setIsToastOpen, navigate]);

  return (
    <>
      <IconButton isDarkTheme={isDarkTheme} onClick={setIsDeletionWindowOpen.on}>
        <DeleteIcon />
      </IconButton>
      {isDeletionWindowOpen && (
        <DeletionWindow
          confirmationText="Do you want to delete this artist profile?"
          warningText="You will not be able to recover this profile afterwards."
          onClose={setIsDeletionWindowOpen.off}
          onSubmit={() => deleteArtistById(artistId as string)}
        />
      )}
      {isToastOpen && (
        <Toast
          isDarkTheme={isDarkTheme}
          message={toastMessage}
          isError={isError}
          onClose={setIsToastOpen.off}
        />
      )}
    </>
  );
};

export default DeleteArtistButton;
