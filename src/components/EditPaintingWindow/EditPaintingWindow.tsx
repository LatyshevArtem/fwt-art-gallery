import {
  ChangeEventHandler,
  DragEventHandler,
  FC,
  RefCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames/bind';
import { DataOfAddPaintingToArtist, useAddPaintingToArtistMutation } from '@api/features';
import { useMatchMedia } from '@hooks/useMatchMedia';
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

interface EditFormValues extends Omit<DataOfAddPaintingToArtist, 'image'> {
  image?: FileList;
}

interface EditPaintingWindowProps {
  artistId: string;
  onClose: () => void;
}

const EditPaintingWindow: FC<EditPaintingWindowProps> = ({ artistId, onClose }) => {
  const [isDragged, setIsDragged] = useState(false);
  const editFormRef = useRef<HTMLFormElement>(null);
  const imageSelectRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EditFormValues>();
  const { isMobile } = useMatchMedia();
  const [addPaintingToArtist, { isSuccess }] = useAddPaintingToArtistMutation();

  const {
    ref: imageInputNodeCallbackRef,
    onChange: onImageChange,
    ...restImageFiledRegisterValues
  } = register('image');

  const isImageSelected = imageRef.current?.src;
  const uploadButtonTextWithoutUnderline = 'Drop your image here, or';

  const handleFirstRenderOfImageSelectNode: RefCallback<HTMLInputElement> = (imageSelectNode) => {
    imageInputNodeCallbackRef(imageSelectNode);
    imageSelectRef.current = imageSelectNode;
  };

  const triggerClickEventOnImageInputElement = () => imageSelectRef.current?.click();

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onImageChange(event);
    if (imageSelectRef.current?.files && imageRef.current) {
      const imageAsFile = imageSelectRef.current.files[0];
      const imageAsUrl = URL.createObjectURL(imageAsFile);
      imageRef.current.src = imageAsUrl;
    }
  };

  const resetImage = () => {
    imageRef.current?.removeAttribute('src');
    resetField('image');
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragged(true);
  };

  const handleImageDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (imageSelectRef.current && imageRef.current) {
      imageSelectRef.current.files = event.dataTransfer.files;
      imageRef.current.src = URL.createObjectURL(event.dataTransfer.files[0]);
      setIsDragged(false);
    }
  };

  const onEditFormSubmit = () => {
    const formData = new FormData(editFormRef.current || undefined);
    addPaintingToArtist({ id: artistId, data: formData });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  watch('image');

  return (
    <Modal onClose={onClose}>
      <ModalBackdrop className={cx('edit-painting-window-backdrop')} />
      <div className={cx('edit-painting-window-content-wrapper')}>
        <ModalContent
          className={cx('edit-painting-window')}
          onDragOver={handleDragOver}
          onDragLeave={() => setIsDragged(false)}
        >
          <ModalCloseButton className={cx('edit-painting-window__close-button')} />
          <form
            className={cx('edit-painting-window__edit-form')}
            ref={editFormRef}
            onSubmit={handleSubmit(onEditFormSubmit)}
            method="post"
            encType="multipart/form-data"
          >
            <div className={cx('edit-painting-window__form-text-controls-wrapper')}>
              <FormControl
                className={cx(
                  'edit-painting-window__form-control',
                  'edit-painting-window__form-control--name',
                )}
              >
                <FormLabel>The name of the picture</FormLabel>
                <Input
                  {...register('name', { required: { value: true, message: 'Enter name' } })}
                />
                <FormErrorMessage text={errors.name?.message} shouldShow={Boolean(errors.name)} />
              </FormControl>
              <FormControl
                className={cx(
                  'edit-painting-window__form-control',
                  'edit-painting-window__form-control--year-of-creation',
                )}
              >
                <FormLabel>Year of creation</FormLabel>
                <Input
                  {...register('yearOfCreation', {
                    required: { value: true, message: 'Enter year of creation' },
                  })}
                  type="number"
                  inputMode="numeric"
                />
                <FormErrorMessage
                  text={errors.name?.message}
                  shouldShow={Boolean(errors.yearOfCreation)}
                />
              </FormControl>
            </div>
            <div
              className={cx('edit-painting-window__drop-area', {
                'edit-painting-window__drop-area--image-selected': isImageSelected,
                'edit-painting-window__drop-area--active': isDragged,
              })}
              onDrop={handleImageDrop}
            >
              <FormControl className={cx('visually-hidden')}>
                <FormLabel>Browse image</FormLabel>
                <Input
                  ref={handleFirstRenderOfImageSelectNode}
                  onChange={handleImageChange}
                  {...restImageFiledRegisterValues}
                  type="file"
                />
              </FormControl>
              <span
                className={cx('edit-painting-window__hint', {
                  'edit-painting-window__hint--image-selected': isImageSelected,
                })}
              >
                Upload only .jpg or .png format less than 3 MB
              </span>
              <img
                className={cx('edit-painting-window__image', {
                  'edit-painting-window__image--image-selected': isImageSelected,
                })}
                ref={imageRef}
                alt=""
              />
              <button
                className={cx('edit-painting-window__upload-image-button', {
                  'edit-painting-window__upload-image-button--image-selected': isImageSelected,
                })}
                onClick={triggerClickEventOnImageInputElement}
                type="button"
                tabIndex={-1}
                aria-hidden
              >
                {!isMobile && uploadButtonTextWithoutUnderline}
                <span className={cx('upload-image-button__underlined-text')}>
                  {isMobile ? 'browse image' : 'browse'}
                </span>
              </button>
              {isImageSelected && (
                <IconButton
                  className={cx('edit-painting-window__image-reset-button')}
                  onClick={resetImage}
                  isOverImage
                  type="button"
                >
                  <span className="visually-hidden">Delete selected image</span>
                  <DeleteIcon aria-hidden />
                </IconButton>
              )}
            </div>
            <TextButton
              className={cx('edit-painting-window__edit-form-submit-button')}
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
