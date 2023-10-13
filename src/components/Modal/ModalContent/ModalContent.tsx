import { FC, HTMLAttributes, useRef } from 'react';
import { useModalContext } from '../Modal';
import { useCloseOnOutsideEvents } from './useCloseOnOutsideEvents';

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  shouldAttachHandlerOutsideEvents?: boolean;
}

const ModalContent: FC<ModalContentProps> = ({
  children,
  className,
  shouldAttachHandlerOutsideEvents = true,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { onClose } = useModalContext();

  useCloseOnOutsideEvents(modalRef, onClose, shouldAttachHandlerOutsideEvents);

  return (
    <div className={className} ref={modalRef} {...props}>
      {children}
    </div>
  );
};

export default ModalContent;
