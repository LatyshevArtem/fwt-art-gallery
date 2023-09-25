import { FC, HTMLAttributes, useRef } from 'react';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { useEscapeKeydown } from '@hooks/useEscapeKeydown';
import { useModalContext } from '../Modal';

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

const ModalContent: FC<ModalContentProps> = ({ children, className, ...props }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { onClose } = useModalContext();

  useOutsideClick(modalRef, onClose);
  useEscapeKeydown(modalRef, onClose);

  return (
    <div className={className} ref={modalRef} {...props}>
      {children}
    </div>
  );
};

export default ModalContent;
