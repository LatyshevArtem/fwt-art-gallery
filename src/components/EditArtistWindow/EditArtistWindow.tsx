import {
  ChangeEvent,
  ChangeEventHandler,
  DragEventHandler,
  FC,
  RefCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames/bind';
import { useThemeContext } from '@hooks/useThemeContext';
import { DataOfAddArtistRequest, useAddArtistMutation, useEditArtistMutation } from '@api/features';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import FormControl from '@components/FormControl';
import FormLabel from '@components/FormLabel';
import Input from '@components/Input';
import IconButton from '@components/IconButton';
import FormErrorMessage from '@components/FormErrorMessage';
import TextButton from '@components/TextButton';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete--default-size.svg';
import { ArtistById } from '@schemas/ArtistById';
import styles from './EditArtistWindow.module.scss';

const cx = cn.bind(styles);

interface EditFormValues extends Omit<DataOfAddArtistRequest, 'avatar'> {
  avatar?: string | FileList;
}

interface EditArtistWindowProps {
  artist?: ArtistById;
  onClose: () => void;
}

const EditArtistWindow: FC<EditArtistWindowProps> = ({ artist, onClose }) => {
  const [isDragged, setIsDragged] = useState(false);
  const editFormRef = useRef<HTMLFormElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const avatarSelectNodeRef = useRef<HTMLInputElement | null>(null);
  const avatarPreviewNodeRef = useRef<HTMLImageElement>(null);
  const formId = useId();
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<EditFormValues>();
  const { isDarkTheme } = useThemeContext();
  const [addArtist, { isSuccess }] = useAddArtistMutation();
  const [editArtist] = useEditArtistMutation();

  const {
    ref: avatarFieldRef,
    onChange: onAvatarChange,
    ...restAvatarFiledRegisterValues
  } = register('avatar');

  const isAvatarSelected = avatarPreviewNodeRef.current?.src || avatarSelectNodeRef.current?.value;
  const avatarAltText = isAvatarSelected ? 'Your selected file' : 'Drop your file here';

  const triggerClickEventOnAvatarInputElement = () => avatarSelectNodeRef.current?.click();

  const showSelectedAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && event.target.files && avatarPreviewNodeRef.current) {
      avatarPreviewNodeRef.current.src = URL.createObjectURL(event.target.files[0]);
    }
  };

  const handleFirstRenderOfAvatarSelectNode: RefCallback<HTMLInputElement> = (avatarSelectNode) => {
    avatarFieldRef(avatarSelectNode);
    avatarSelectNodeRef.current = avatarSelectNode;
  };

  const handleAvatarChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (avatarSelectNodeRef.current?.value) {
      onAvatarChange(event);
      showSelectedAvatar(event);
    }
  };

  const resetAvatar = () => {
    avatarPreviewNodeRef.current?.removeAttribute('src');
    resetField('avatar');
  };

  const onEditFormSubmit: SubmitHandler<EditFormValues> = () => {
    const formData = new FormData(editFormRef.current || undefined);
    if (artist) {
      editArtist({ id: artist!._id, data: formData });
    } else {
      addArtist(formData);
    }
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragged(true);
  };

  const handleImageDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (avatarSelectNodeRef.current && avatarPreviewNodeRef.current) {
      avatarSelectNodeRef.current.files = event.dataTransfer.files;
      avatarPreviewNodeRef.current.src = URL.createObjectURL(event.dataTransfer.files[0]);
      setIsDragged(false);
    }
  };

  useEffect(() => {
    if (artist) {
      const { avatar, name, yearsOfLife, description, genres } = artist;
      setValue('avatar', avatar.src);
      avatarPreviewNodeRef.current!.src = `https://internship-front.framework.team/${avatar.src}`;
      setValue('name', name);
      setValue('yearsOfLife', yearsOfLife);
      setValue('description', description);
      setValue('genres', genres);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  watch('avatar');

  return (
    <Modal onClose={onClose}>
      <ModalBackdrop
        className={cx('edit-artist-window-backdrop', {
          'edit-artist-window-backdrop--dark': isDarkTheme,
        })}
      />
      <div className={cx('edit-artist-window-wrapper')}>
        <ModalContent
          className={cx('edit-artist-window', { 'edit-artist-window--dark': isDarkTheme })}
          onDragOver={handleDragOver}
          onDragLeave={() => setIsDragged(false)}
        >
          <ModalCloseButton className={cx('edit-artist-window__close-button')} />
          <FormControl className={cx('edit-artist-window__file-input-container')}>
            <Input
              className="visually-hidden"
              ref={handleFirstRenderOfAvatarSelectNode}
              onChange={handleAvatarChange}
              {...restAvatarFiledRegisterValues}
              form={formId}
              type="file"
              accept="image/*"
            />
            <div
              className={cx('file-input-container__drop-area', {
                'file-input-container__drop-area--image-selected': isAvatarSelected,
                'file-input-container__drop-area--dark': isDarkTheme,
                'file-input-container__drop-area--active': isDragged,
              })}
              ref={dropAreaRef}
              onDrop={handleImageDrop}
            >
              {!isAvatarSelected && (
                <span className={cx('drop-area__caption')}>You can drop your image here</span>
              )}
              <img
                className={cx('drop-area__image', {
                  'drop-area__image--image-selected': isAvatarSelected && !isDragged,
                })}
                ref={avatarPreviewNodeRef}
                width="200"
                height="200"
                alt={avatarAltText}
              />
              <button
                className={cx('drop-area__upload-avatar-button', {
                  'edit-form__upload-avatar-button--avatar-selected': false,
                })}
                onClick={triggerClickEventOnAvatarInputElement}
                type="button"
                tabIndex={-1}
                aria-hidden
              />
              {isAvatarSelected && (
                <IconButton
                  className={cx('drop-area__avatar-reset-button')}
                  isDarkTheme={isDarkTheme}
                  onClick={resetAvatar}
                  isOverImage
                >
                  <span className="visually-hidden">Delete selected profile photo</span>
                  <DeleteIcon aria-hidden />
                </IconButton>
              )}
            </div>
            <FormLabel
              className={cx('file-input-container__label', {
                'file-input-container__label--dark': isDarkTheme,
              })}
            >
              Browse profile photo
            </FormLabel>
          </FormControl>
          <form
            className={cx('edit-artist-window__edit-form')}
            ref={editFormRef}
            onSubmit={handleSubmit(onEditFormSubmit)}
            method="post"
            encType="multipart/form-data"
            id={formId}
          >
            <FormControl className={cx('edit-form__form-control')} isDarkTheme={isDarkTheme}>
              <FormLabel>Name</FormLabel>
              <Input {...register('name', { required: { value: true, message: 'Enter name' } })} />
              <FormErrorMessage text={errors.name?.message} shouldShow={Boolean(errors.name)} />
            </FormControl>
            <FormControl className={cx('edit-form__form-control')} isDarkTheme={isDarkTheme}>
              <FormLabel>Years of life</FormLabel>
              <Input
                {...register('yearsOfLife', {
                  required: { value: true, message: 'Enter years of life' },
                })}
              />
              <FormErrorMessage
                text={errors.yearsOfLife?.message}
                shouldShow={Boolean(errors.yearsOfLife)}
              />
            </FormControl>
            <TextButton
              className={cx('edit-form__submit-button')}
              isDarkTheme={isDarkTheme}
              type="submit"
            >
              Save
            </TextButton>
          </form>
        </ModalContent>
      </div>
    </Modal>
  );
};

export default EditArtistWindow;
