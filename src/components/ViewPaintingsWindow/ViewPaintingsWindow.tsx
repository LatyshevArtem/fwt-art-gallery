import { FC, useMemo } from 'react';
import cn from 'classnames/bind';
import { useBoolean } from '@hooks/useBoolean';
import Modal, { ModalBackdrop, ModalContent, ModalCloseButton } from '@components/Modal';
import { Painting } from '@schemas/Painting';
import {
  IViewPaintingsWindowContext,
  ViewPaintingsWindowContext,
} from './ViewPaintingsWindowContext';
import Slider from './Slider/Slider';
import styles from './ViewPaintingsWindow.module.scss';

const cx = cn.bind(styles);

interface ViewPaintingsWindowProps {
  artistId: string;
  paintings: Painting[];
  initialSlideNumber: number;
  onClose: () => void;
}

const ViewPaintingsWindow: FC<ViewPaintingsWindowProps> = ({
  artistId,
  paintings,
  initialSlideNumber,
  onClose,
}) => {
  const [shouldAttachHandlerOutsideEvents, setShouldAttachHandlerOutsideEvents] = useBoolean();

  const context: IViewPaintingsWindowContext = useMemo(
    () => ({
      artistId,
      setShouldAttachHandlerOutsideEventsToRootModal: setShouldAttachHandlerOutsideEvents,
    }),
    [artistId, setShouldAttachHandlerOutsideEvents],
  );

  return (
    <Modal onClose={onClose}>
      <ModalBackdrop className={cx('view-paintings-window-backdrop')} />
      <div className={cx('view-paintings-window-content-wrapper')}>
        <ModalContent
          className={cx('view-paintings-window')}
          shouldAttachHandlerOutsideEvents={shouldAttachHandlerOutsideEvents}
        >
          <ModalCloseButton className={cx('view-paintings-window__close-button')} />
          <ViewPaintingsWindowContext.Provider value={context}>
            <Slider initialSlideNumber={initialSlideNumber} paintings={paintings} />
          </ViewPaintingsWindowContext.Provider>
        </ModalContent>
      </div>
    </Modal>
  );
};

export default ViewPaintingsWindow;
