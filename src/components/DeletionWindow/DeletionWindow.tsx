import { FC, FormEventHandler } from 'react';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import TextButton from '@components/TextButton';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete--large-size.svg';
import styles from './DeletionWindow.module.scss';

const cx = cn.bind(styles);

interface DeletionWindowProps {
  confirmationText: string;
  warningText: string;
  onClose: () => void;
  onSubmit: () => void;
}

const DeletionWindow: FC<DeletionWindowProps> = ({
  confirmationText,
  warningText,
  onClose,
  onSubmit,
}) => {
  const { isDarkTheme } = useThemeContext();
  const { isMobile } = useMatchMedia();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Modal onClose={onClose}>
      <ModalBackdrop
        className={cx('artist-delete-pop-up-backdrop', {
          'artist-delete-pop-up-backdrop--dark': isDarkTheme,
        })}
      />
      <div className={cx('artist-delete-pop-up-content-wrapper')}>
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
            {confirmationText}
          </p>
          <strong className={cx('artist-delete-pop-up__caption')}>{warningText}</strong>
          <form className={cx('artist-delete-pop-up__deletion-form')} onSubmit={handleSubmit}>
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
      </div>
    </Modal>
  );
};

export default DeletionWindow;
