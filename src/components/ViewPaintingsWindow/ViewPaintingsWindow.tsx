import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import cn from 'classnames/bind';
import 'swiper/css/bundle';
import { useMatchMedia } from '@hooks/useMatchMedia';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import { Painting } from '@schemas/Painting';
import Picture from '@components/Picture';
import TextButton from '@components/TextButton';
import IconButton from '@components/IconButton';
import EditPaintingWindow from '@components/EditPaintingWindow';
import {
  useChangeArtistMainPaintingMutation,
  useDeleteArtistPaintingMutation,
} from '@api/features';
import { ReactComponent as ChangePaintingIcon } from '@assets/icons/change-painting.svg';
import { ReactComponent as ArrowIcon } from '@assets/icons/arrow-as-triangle--large-size.svg';
import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '@assets/icons/delete--default-size.svg';
import DeletionWindow from '@components/DeletionWindow';
import styles from './ViewPaintingsWindow.module.scss';

const cx = cn.bind(styles);

interface ViewPaintingsWindowProps {
  artistId: string;
  paintings: Painting[];
  slideNumberToStartView: number;
  onClose: () => void;
}

const ViewPaintingsWindow: FC<ViewPaintingsWindowProps> = ({
  artistId,
  paintings,
  slideNumberToStartView,
  onClose,
}) => {
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(slideNumberToStartView);
  const [isEditPaintingWindowOpen, setIsEditPaintingWindowOpen] = useState(false);
  const [isPaintingDeleteWindowOpen, setIsPaintingDeleteWindowOpen] = useState(false);
  const [paintingIdToDelete, setPaintingIdToDelete] = useState('');
  const { isMobile } = useMatchMedia();
  const [changeArtistMainPainting] = useChangeArtistMainPaintingMutation();
  const [deleteArtistPainting, { isSuccess }] = useDeleteArtistPaintingMutation();

  const areServiceWindowsOpen = isEditPaintingWindowOpen || isPaintingDeleteWindowOpen;

  const openEditPaintingWindow = () => setIsEditPaintingWindowOpen(true);
  const closeEditPaintingWindow = () => setIsEditPaintingWindowOpen(false);

  const openPaintingDeleteWindow = () => setIsPaintingDeleteWindowOpen(true);
  const closePaintingDeleteWindow = () => setIsPaintingDeleteWindowOpen(false);

  const handleChangePaintingButtonClick = (paintingId: string) => {
    return () => changeArtistMainPainting({ artistId, data: { mainPainting: paintingId } });
  };

  const handleEditPaintingButtonClick = (paintingId: string) => {
    return () => {
      openEditPaintingWindow();
      setPaintingIdToDelete(paintingId);
    };
  };

  const handleDeletePaintingButtonClick = (paintingId: string) => {
    return () => {
      openPaintingDeleteWindow();
      setPaintingIdToDelete(paintingId);
    };
  };

  const submitDeletionForm = () => {
    return () => deleteArtistPainting({ artistId, paintingId: paintingIdToDelete });
  };

  useEffect(() => {
    if (isSuccess) {
      closePaintingDeleteWindow();
    }
  }, [isSuccess]);

  return (
    <>
      <Modal onClose={onClose}>
        <ModalBackdrop
          className={cx('view-paintings-window-backdrop', {
            'view-paintings-window-backdrop--service-windows-open': areServiceWindowsOpen,
          })}
        />
        <div className={cx('view-paintings-window-content-wrapper')}>
          <ModalContent
            className={cx('view-paintings-window', {
              'view-paintings-window--service-windows-open': areServiceWindowsOpen,
            })}
            shouldAttachHandlerOutsideEvents={!areServiceWindowsOpen}
          >
            <ModalCloseButton className={cx('view-paintings-window__close-button')} />
            <Swiper
              className={cx('view-paintings-window__slider')}
              modules={[Navigation]}
              navigation={{
                prevEl: `.${cx('view-paintings-window__slider-navigation-buttons--prev')}`,
                nextEl: `.${cx('view-paintings-window__slider-navigation-buttons--next')}`,
              }}
              slidesPerView={1}
              spaceBetween={0}
              initialSlide={slideNumberToStartView}
              onActiveIndexChange={(swiper: any) => {
                setSwiperActiveIndex(swiper.activeIndex);
              }}
            >
              <button
                className={cx(
                  'view-paintings-window__slider-navigation-buttons',
                  'view-paintings-window__slider-navigation-buttons--prev',
                )}
              >
                <ArrowIcon aria-hidden />
                <span className="visually-hidden">Previous slide</span>
              </button>
              <button
                className={cx(
                  'view-paintings-window__slider-navigation-buttons',
                  'view-paintings-window__slider-navigation-buttons--next',
                )}
              >
                <ArrowIcon aria-hidden />
                <span className="visually-hidden">Next slide</span>
              </button>
              {paintings.map((painting) => (
                <SwiperSlide className={cx('view-paintings-window__slide')} key={painting._id}>
                  <figure className={cx('view-paintings-window__painting-card')}>
                    <TextButton
                      className={cx('view-paintings-window__change-painting-button')}
                      onClick={handleChangePaintingButtonClick(painting._id)}
                      isUnderlined
                    >
                      <span
                        className={cx('view-paintings-window__change-painting-button-icon-wrapper')}
                      >
                        <ChangePaintingIcon
                          className={cx('view-paintings-window__change-painting-button-icon')}
                        />
                      </span>
                      <span>Make the cover</span>
                    </TextButton>
                    <Picture
                      className={cx('view-paintings-window__painting')}
                      image={painting.image}
                    />
                    <figcaption className={cx('view-paintings-window__painting-caption')}>
                      {!isMobile && (
                        <div className={cx('view-paintings-window__controls')}>
                          <IconButton
                            className={cx('view-paintings-window__control')}
                            onClick={handleEditPaintingButtonClick(painting._id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            className={cx('view-paintings-window__control')}
                            onClick={handleDeletePaintingButtonClick(painting._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                      <time className={cx('view-paintings-window__year-of-creation-painting')}>
                        {painting.yearOfCreation}
                      </time>
                      <cite className={cx('view-paintings-window__painting-name')}>
                        {painting.name}
                      </cite>
                    </figcaption>
                  </figure>
                  {isMobile && (
                    <div className={cx('view-paintings-window__controls')}>
                      <IconButton onClick={handleEditPaintingButtonClick(painting._id)} isOverImage>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleDeletePaintingButtonClick(painting._id)}
                        isOverImage
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                  <div className={cx('view-paintings-window__slide-counter')}>
                    {swiperActiveIndex + 1}/{paintings.length}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </ModalContent>
        </div>
      </Modal>
      {isPaintingDeleteWindowOpen && (
        <DeletionWindow
          confirmationText="Do you want to delete this picture?"
          warningText="You will not be able to recover this picture afterwards."
          onSubmit={submitDeletionForm}
          onClose={closePaintingDeleteWindow}
        />
      )}
      {isEditPaintingWindowOpen && (
        <EditPaintingWindow artistId={artistId} onClose={closeEditPaintingWindow} />
      )}
    </>
  );
};

export default ViewPaintingsWindow;
