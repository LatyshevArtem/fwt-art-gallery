import { FC, FormEventHandler } from 'react';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { useDeleteArtistByIdMutation } from '@api/features';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import TextButton from '@components/TextButton';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete--large-size.svg';
import styles from './ArtistDeletePopUp.module.scss';

const cx = cn.bind(styles);

interface ArtistDeletePopUpProps {
  id: string;
  onClose: () => void;
}

const ArtistDeletePopUp: FC<ArtistDeletePopUpProps> = ({ id, onClose }) => {
  const { isDarkTheme } = useThemeContext();
  const { isMobile } = useMatchMedia();
  const [deleteArtistById] = useDeleteArtistByIdMutation();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    deleteArtistById(id);
  };

  return (
    <Modal onClose={onClose}>
      <ModalBackdrop
        className={cx('artist-delete-pop-up-backdrop', {
          'artist-delete-pop-up-backdrop--dark': isDarkTheme,
        })}
      />
      <ModalContent
        className={cx('artist-delete-pop-up', { 'artist-delete-pop-up--dark': isDarkTheme })}
      >
        {!isMobile && <ModalCloseButton className={cx('artist-delete-pop-up__close-button')} />}
        {!isMobile && (
          <DeleteIcon
            className={cx('artist-delete-pop-up__delete-icon', {
              'artist-delete-pop-up__delete-icon--dark': isDarkTheme,
            })}
          />
        )}
        <p
          className={cx('artist-delete-pop-up__title', {
            'artist-delete-pop-up__title--dark': isDarkTheme,
          })}
        >
          Do you want to delete this artist profile?
        </p>
        <small className={cx('artist-delete-pop-up__caption')}>
          You will not be able to recover this profile afterwards.
        </small>
        <form className={cx('artist-delete-pop-up__deletion-form')} onSubmit={handleSubmit}>
          <input value={id} type="hidden" />
          <TextButton
            className={cx('artist-delete-pop-up__deletion-form-submit-button')}
            isDarkTheme={isDarkTheme}
            type="submit"
          >
            Delete
          </TextButton>
        </form>
        <TextButton isDarkTheme={isDarkTheme} onClick={onClose} isUnderlined>
          Cancel
        </TextButton>
      </ModalContent>
    </Modal>
  );
};

export default ArtistDeletePopUp;
