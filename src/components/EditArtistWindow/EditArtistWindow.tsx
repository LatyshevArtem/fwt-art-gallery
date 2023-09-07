import { FC } from 'react';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import Modal from '@components/Modal';
import ModalCloseButton from '@components/ModalCloseButton';
import FormControl from '@components/FormControl';
import FormLabel from '@components/FormLabel';
import Input from '@components/Input';
import FormErrorMessage from '@components/FormErrorMessage';
import TextButton from '@components/TextButton';
import styles from './EditArtistWindow.module.scss';

const cx = cn.bind(styles);

interface EditArtistWindowProps {
  onClose: () => void;
}

const EditArtistWindow: FC<EditArtistWindowProps> = ({ onClose }) => {
  const { isDarkTheme } = useThemeContext();

  return (
    <Modal
      backdropClassName={cx('edit-artist-window__backdrop')}
      contentClassName={cx('edit-artist-window')}
      onClose={onClose}
      isOpen
    >
      <ModalCloseButton className={cx('edit-artist-window__close-button')} />
      <form className={cx('edit-artist-window__edit-form')}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input />
          <FormErrorMessage shouldShow />
        </FormControl>
        <FormControl>
          <FormLabel>Years of life</FormLabel>
          <Input />
          <FormErrorMessage shouldShow />
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input />
          <FormErrorMessage shouldShow />
        </FormControl>
        <TextButton
          className={cx('edit-form__submit-button')}
          isDarkTheme={isDarkTheme}
          type="submit"
        >
          Save
        </TextButton>
      </form>
    </Modal>
  );
};

export default EditArtistWindow;
