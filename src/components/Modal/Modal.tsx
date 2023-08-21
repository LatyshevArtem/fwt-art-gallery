import { useRef, useEffect, FC, PropsWithChildren } from 'react';
import Portal from '@components/Portal';
import { useOutsideClick } from '@hooks/useOutsideClick';

interface ModalProps extends PropsWithChildren {
  backdropClassName?: string;
  contentClassName?: string;
  isOpen: boolean;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  backdropClassName,
  contentClassName,
  isOpen,
  onClose = () => {},
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    const handleEscapePress = (evt: KeyboardEvent) => {
      if (modalRef.current && (evt.key === 'Escape' || evt.key === 'Esc')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapePress);

    return () => document.removeEventListener('keydown', handleEscapePress);
  }, [onClose]);

  return isOpen ? (
    <Portal>
      <div className={backdropClassName}>
        <div className={contentClassName} ref={modalRef}>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
