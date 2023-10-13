import { ChangeEventHandler, FC, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames/bind';
import { Painting } from '@schemas/Painting';
import { useThemeContext } from '@hooks/useThemeContext';
import { useMatchMedia } from '@hooks/useMatchMedia';
import { addHostToRelativePath } from '@utils/addHostToRelativePath';
import Modal, { ModalBackdrop, ModalCloseButton, ModalContent } from '@components/Modal';
import FormControl from '@components/FormControl';
import FormLabel from '@components/FormLabel';
import Input from '@components/Input';
import FormErrorMessage from '@components/FormErrorMessage';
import IconButton from '@components/IconButton';
import TextButton from '@components/TextButton';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete--default-size.svg';
import styles from './EditPaintingWindow.module.scss';

const cx = cn.bind(styles);

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const getInitialImageSrc = (src?: string) => src && addHostToRelativePath(src);

const getDefaultFormValues = (painting?: Painting) =>
  ({
    name: painting?.name || '',
    yearOfCreation: painting?.yearOfCreation || '',
    image: new DataTransfer().files,
  }) as FormValues;

interface FormValues extends Pick<Painting, 'name' | 'yearOfCreation'> {
  image: FileList;
}

interface EditPaintingWindowProps {
  painting?: Painting;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

const EditPaintingWindow: FC<EditPaintingWindowProps> = ({ painting, onSubmit, onClose }) => {
  const [imageSrc, setImageSrc] = useState(() => getInitialImageSrc(painting?.image.src));
  const formRef = useRef<HTMLFormElement>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ defaultValues: getDefaultFormValues(painting) });
  const { isDarkTheme } = useThemeContext();
  const { isMobile } = useMatchMedia();

  const {
    ref: imageInputCallbackRef,
    onChange: onImageChange,
    ...restImageFieldRegisterValues
  } = register('image', {
    required: { value: false, message: 'Image is required' },
  });

  useImperativeHandle(imageInputCallbackRef, () => imageInputRef.current);

  const imageAltText = imageSrc ? 'Your selected file' : 'Drop your file here';

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files?.length && allowedTypes.includes(event.target.files[0].type)) {
      onImageChange(event);
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    } else if (imageInputRef.current) {
      imageInputRef.current.files = getValues('image');
    }
  };

  const resetImage = () => {
    setImageSrc(undefined);
    resetField('image');
    imageInputRef.current!.files = getValues('image');
  };

  const onEditFormSubmit = () => onSubmit(new FormData(formRef.current as HTMLFormElement));

  return (
    <Modal onClose={onClose}>
      <ModalBackdrop className={cx('edit-painting-window-backdrop')} />
      <div className={cx('edit-painting-window-content-wrapper')}>
        <ModalContent
          className={cx('edit-painting-window', { 'edit-painting-window--dark': isDarkTheme })}
        >
          <ModalCloseButton className={cx('edit-painting-window__close-button')} />
          <form
            className={cx('edit-painting-window__edit-form')}
            ref={formRef}
            onSubmit={handleSubmit(onEditFormSubmit)}
          >
            <div className={cx('edit-painting-window__form-text-controls-wrapper')}>
              <FormControl
                className={cx(
                  'edit-painting-window__form-control',
                  'edit-painting-window__form-control--name',
                )}
                isDarkTheme={isDarkTheme}
              >
                <FormLabel>The name of the picture</FormLabel>
                <Input
                  {...register('name', {
                    required: { value: true, message: 'Name should not be empty' },
                    minLength: {
                      value: 3,
                      message: 'Name must be longer than or equal to 3 characters',
                    },
                  })}
                />
                <FormErrorMessage text={errors.name?.message} shouldShow={Boolean(errors.name)} />
              </FormControl>
              <FormControl
                className={cx(
                  'edit-painting-window__form-control',
                  'edit-painting-window__form-control--year-of-creation',
                )}
                isDarkTheme={isDarkTheme}
              >
                <FormLabel>Year of creation</FormLabel>
                <Input {...register('yearOfCreation')} type="number" inputMode="numeric" />
                <FormErrorMessage
                  text={errors.name?.message}
                  shouldShow={Boolean(errors.yearOfCreation)}
                />
              </FormControl>
            </div>
            <FormControl
              className={cx('edit-painting-window__file-input-container', {
                'edit-painting-window__file-input-container--dark': isDarkTheme,
                'edit-painting-window__file-input-container--image-selected': imageSrc,
              })}
            >
              <p
                className={cx('edit-painting-window__file-input-hints', {
                  'edit-painting-window__file-input-hints--dark': isDarkTheme,
                })}
              >
                <span
                  className={cx('edit-painting-window__file-input-place-hint', {
                    'edit-painting-window__file-input-place-hint--dark': isDarkTheme,
                  })}
                >
                  {!isMobile && (
                    <>
                      Drop your image here, or
                      <br />
                    </>
                  )}
                  <span className={cx('edit-painting-window__underlined-file-input-place-hint')}>
                    {isMobile ? 'browse image' : 'browse'}
                  </span>
                </span>
                <small
                  className={cx('edit-painting-window__file-input-allowed-files-hint', {
                    'edit-painting-window__file-input-allowed-files-hint--dark': isDarkTheme,
                  })}
                >
                  Upload only .jpg or .png format less than 3 MB
                </small>
              </p>
              <img
                className={cx('edit-painting-window__image', {
                  'edit-painting-window__image--image-selected': imageSrc,
                })}
                src={imageSrc}
                alt={imageAltText}
              />
              <Input
                className={cx('edit-painting-window__image-input')}
                ref={imageInputRef}
                onChange={handleImageChange}
                {...restImageFieldRegisterValues}
                type="file"
                accept={allowedTypes.join(',')}
              />
              {imageSrc && (
                <IconButton
                  className={cx('edit-painting-window__image-reset-button')}
                  isDarkTheme={isDarkTheme}
                  onClick={resetImage}
                  isOverImage
                >
                  <span className="visually-hidden">Delete selected painting</span>
                  <DeleteIcon aria-hidden />
                </IconButton>
              )}
              <FormLabel className="visually-hidden">Browse image</FormLabel>
            </FormControl>
            <TextButton
              className={cx('edit-painting-window__edit-form-submit-button')}
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

export default EditPaintingWindow;
