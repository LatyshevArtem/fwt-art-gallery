import { FC } from 'react';
import { ArtistById } from '@schemas/ArtistById';
import { useBoolean } from '@hooks/useBoolean';
import IconButton from '@components/IconButton';
import EditArtistWindow from '@components/EditArtistWindow';
import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { useEditArtistMutation } from '@api/features';

interface EditArtistButtonProps {
  isDarkTheme?: boolean;
  artist: ArtistById;
}

const EditArtistButton: FC<EditArtistButtonProps> = ({ isDarkTheme, artist }) => {
  const [isEditArtistWindowOpen, setIsDeletionWindowOpen] = useBoolean();
  const [editArtist] = useEditArtistMutation();

  const handleSubmit = (data: FormData) => editArtist({ id: artist._id, data });

  return (
    <>
      <IconButton isDarkTheme={isDarkTheme} onClick={setIsDeletionWindowOpen.on}>
        <EditIcon />
      </IconButton>
      {isEditArtistWindowOpen && (
        <EditArtistWindow
          artist={artist}
          onSubmit={handleSubmit}
          onClose={setIsDeletionWindowOpen.off}
        />
      )}
    </>
  );
};

export default EditArtistButton;
