import { ChangeEventHandler, FC, useId, useImperativeHandle, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames/bind';
import { ArtistById } from '@schemas/ArtistById';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { useThemeContext } from '@hooks/useThemeContext';
import { useFetchGenresQuery } from '@api/features';
import { useDragAndDrop } from '@hooks/useDragAndDrop';
import { addHostToRelativePath } from '@utils/addHostToRelativePath';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import FormControl from '@components/FormControl';
import FormLabel from '@components/FormLabel';
import Input from '@components/Input';
import IconButton from '@components/IconButton';
import FormErrorMessage from '@components/FormErrorMessage';
import Textarea from '@components/Textarea';
import TextButton from '@components/TextButton';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete--default-size.svg';
import Select from '@components/Select';
import styles from './EditArtistWindow.module.scss';

const cx = cn.bind(styles);

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const getInitialImageSrc = (src?: string) => src && addHostToRelativePath(src);

const getDefaultFormValues = (artist?: ArtistById) =>
  ({
    avatar: new DataTransfer().files,
    name: artist?.name || '',
    yearsOfLife: artist?.yearsOfLife || '',
    description: artist?.description || '',
    genres: artist?.genres || [],
  }) as FormValues;

interface FormValues extends Pick<ArtistById, 'name' | 'yearsOfLife' | 'description' | 'genres'> {
  avatar: FileList;
}

interface EditArtistWindowProps {
  artist?: ArtistById;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

const EditArtistWindow: FC<EditArtistWindowProps> = ({ artist, onSubmit, onClose }) => {
  const [imageSrc, setImageSrc] = useState(() => getInitialImageSrc(artist?.avatar?.src));
  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
    getValues,
    control,
  } = useForm({ defaultValues: getDefaultFormValues(artist) });
  const { isDesktop } = useMatchMedia();
  const { isDarkTheme } = useThemeContext();
  const { data: genres = [] } = useFetchGenresQuery(undefined);
  const { isDragActive, setIsDragActive, onDragOver, onDragLeave } = useDragAndDrop();

  const {
    ref: imageInputCallbackRef,
    onChange: onImageChange,
    ...restImageFieldRegisterValues
  } = register('avatar');

  const fileInputPlaceHint = isDragActive ? 'Drop your image here' : 'You can drop your image here';
  const imageAltText = imageSrc ? 'Your selected file' : 'Drop your file here';

  useImperativeHandle(imageInputCallbackRef, () => imageInputRef.current);

  const resetImage = () => {
    setImageSrc(undefined);
    resetField('avatar', { defaultValue: undefined });
  };

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value && event.target.files?.length) {
      onImageChange(event);
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    } else if (imageInputRef.current) {
      imageInputRef.current.files = getValues('avatar');
    }
  };

  const onEditFormSubmit: SubmitHandler<FormValues> = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);

    getValues('genres').forEach((genre) => formData.append('genres', genre._id));

    onSubmit(formData);
  };

  return (
    <Modal onClose={onClose}>
      <ModalBackdrop
        className={cx('edit-artist-window-backdrop', {
          'edit-artist-window-backdrop--dark': isDarkTheme,
        })}
      />
      <div className={cx('edit-artist-window-wrapper')}>
        <ModalContent
          className={cx('edit-artist-window', {
            'edit-artist-window--drag-active': isDragActive,
            'edit-artist-window--dark': isDarkTheme,
          })}
          onDragOver={onDragOver()}
        >
          <ModalCloseButton className={cx('edit-artist-window__close-button')} />
          <FormControl className={cx('edit-artist-window__file-input-container')}>
            <div
              className={cx('edit-artist-window__file-input-wrapper', {
                'edit-artist-window__file-input-wrapper--dark': isDarkTheme,
                'edit-artist-window__file-input-wrapper--image-selected': imageSrc,
                'edit-artist-window__file-input-wrapper--drag-active': isDragActive,
              })}
            >
              <p
                className={cx('edit-artist-window__file-input-hints', {
                  'edit-artist-window__file-input-hints--dark': isDarkTheme,
                })}
              >
                {isDesktop && (
                  <>
                    <span
                      className={cx('edit-artist-window__file-input-place-hint', {
                        'edit-artist-window__file-input-place-hint--dark': isDarkTheme,
                        'edit-artist-window__file-input-place-hint--drag-active': isDragActive,
                      })}
                    >
                      {fileInputPlaceHint}
                    </span>
                    <small
                      className={cx('edit-artist-window__file-input-allowed-files-hint', {
                        'edit-artist-window__file-input-allowed-files-hint--dark': isDarkTheme,
                        'edit-artist-window__file-input-allowed-files-hint--drag-active':
                          isDragActive,
                      })}
                    >
                      Upload only .jpg or .png format less than 3 MB
                    </small>
                  </>
                )}
              </p>
              <img
                className={cx('edit-artist-window__image', {
                  'edit-artist-window__image--image-selected': imageSrc,
                  'edit-artist-window__image--drag-active': isDragActive,
                })}
                width="200"
                height="200"
                src={imageSrc}
                alt={imageAltText}
              />
              <Input
                className={cx('edit-artist-window__image-input')}
                ref={imageInputRef}
                onChange={handleImageChange}
                onDrop={() => setIsDragActive(false)}
                onDragLeave={onDragLeave()}
                {...restImageFieldRegisterValues}
                form={formId}
                type="file"
                accept={allowedTypes.join(',')}
              />
              {imageSrc && (
                <IconButton
                  className={cx('edit-artist-window__image-reset-button')}
                  onClick={resetImage}
                  isOverImage
                >
                  <span className="visually-hidden">Delete selected profile photo</span>
                  <DeleteIcon aria-hidden />
                </IconButton>
              )}
            </div>
            <FormLabel
              className={cx('edit-artist-window__file-input-container-label', {
                'edit-artist-window__file-input-container-label--dark': isDarkTheme,
              })}
            >
              Browse profile photo
            </FormLabel>
          </FormControl>
          <form
            className={cx('edit-artist-window__edit-form')}
            ref={formRef}
            onSubmit={handleSubmit(onEditFormSubmit)}
            id={formId}
          >
            <FormControl className={cx('edit-form__form-control')} isDarkTheme={isDarkTheme}>
              <FormLabel>Name</FormLabel>
              <Input {...register('name', { required: { value: false, message: 'Enter name' } })} />
              <FormErrorMessage text={errors.name?.message} shouldShow={Boolean(errors.name)} />
            </FormControl>
            <FormControl className={cx('edit-form__form-control')} isDarkTheme={isDarkTheme}>
              <FormLabel>Years of life</FormLabel>
              <Input
                {...register('yearsOfLife', {
                  required: { value: false, message: 'Enter years of life' },
                })}
              />
              <FormErrorMessage
                text={errors.yearsOfLife?.message}
                shouldShow={Boolean(errors.yearsOfLife)}
              />
            </FormControl>
            <FormControl className={cx('edit-form__form-control')} isDarkTheme={isDarkTheme}>
              <FormLabel>Description</FormLabel>
              <Textarea
                className={cx('edit-artist-window__textarea')}
                {...register('description')}
              />
            </FormControl>
            <Controller
              control={control}
              name="genres"
              render={({ field: { onChange } }) => (
                <Select
                  isDarkTheme={isDarkTheme}
                  options={genres}
                  selectedOptions={getValues('genres') || []}
                  onChangeSelectedOptions={(selectedOptions) => onChange(selectedOptions)}
                />
              )}
            />
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
