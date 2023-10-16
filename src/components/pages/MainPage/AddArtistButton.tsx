import { FC } from 'react';
import cn from 'classnames/bind';
import { useBoolean } from '@hooks/useBoolean';
import { useAddArtistMutation } from '@api/features';
import TextButton from '@components/TextButton';
import EditArtistWindow from '@components/EditArtistWindow';
import { ReactComponent as PlusIcon } from '@assets/icons/plus.svg';
import styles from './MainPage.module.scss';

const cx = cn.bind(styles);

interface AddArtistButtonProps {
  isDarkTheme?: boolean;
}

const AddArtistButton: FC<AddArtistButtonProps> = ({ isDarkTheme }) => {
  const [isEditArtistWindowOpen, setIsEditArtistWindowOpen] = useBoolean();
  const [addArtist] = useAddArtistMutation();

  return (
    <>
      <TextButton
        className={cx('main-page__add-artist-button', {
          'main-page__add-artist-button--dark': isDarkTheme,
        })}
        isDarkTheme={isDarkTheme}
        onClick={setIsEditArtistWindowOpen.on}
        isUnderlined
      >
        <PlusIcon aria-hidden />
        <span>Add artist</span>
      </TextButton>
      {isEditArtistWindowOpen && (
        <EditArtistWindow onSubmit={addArtist} onClose={setIsEditArtistWindowOpen.off} />
      )}
    </>
  );
};

export default AddArtistButton;
