import { useRef, FC, PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { useEscapeKeydown } from '@hooks/useEscapeKeydown';
import Portal from '@components/Portal';

interface ModalContextType {
  onCloseButtonClick: () => void;
}

const ModalContext = createContext<ModalContextType>({ onCloseButtonClick: () => {} });

const useModalContext = () => {
  const { onCloseButtonClick } = useContext(ModalContext);

  return { onCloseButtonClick };
};

interface ModalProps extends PropsWithChildren {
  backdropClassName?: string;
  contentClassName?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  backdropClassName,
  contentClassName,
  isOpen,
  onClose = () => {},
}) => {
  const context = useMemo<ModalContextType>(
    () => ({
      onCloseButtonClick: onClose,
    }),
    [onClose],
  );

  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose);
  useEscapeKeydown(modalRef, onClose);

  return isOpen ? (
    <ModalContext.Provider value={context}>
      <Portal>
        <div className={backdropClassName}>
          <div className={contentClassName} ref={modalRef}>
            {children}
          </div>
        </div>
      </Portal>
    </ModalContext.Provider>
  ) : null;
};

export { useModalContext };
export default Modal;
