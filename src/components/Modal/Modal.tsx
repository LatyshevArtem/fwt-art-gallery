import { FC, PropsWithChildren, createContext, useContext, useEffect, useMemo } from 'react';
import Portal from '@components/Portal';

interface ModalContextType {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType>({
  onClose: () => {},
});

const useModalContext = () => useContext(ModalContext);

interface ModalProps extends PropsWithChildren {
  shouldSetOverflowHiddenToBody?: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, shouldSetOverflowHiddenToBody = true, onClose }) => {
  const context = useMemo(
    () => ({
      onClose,
    }),
    [onClose],
  );

  useEffect(() => {
    const prevOverflowValue = document.body.style.overflow;

    if (shouldSetOverflowHiddenToBody) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = prevOverflowValue;
      if (document.body.style.length === 0) {
        document.body.removeAttribute('style');
      }
    };
  }, [shouldSetOverflowHiddenToBody]);

  return (
    <Portal>
      <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
    </Portal>
  );
};

export { useModalContext };
export default Modal;
