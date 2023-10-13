import { RefObject } from 'react';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { useEscapeKeydown } from '@hooks/useEscapeKeydown';

export const useCloseOnOutsideEvents = (
  ref: RefObject<HTMLElement>,
  onClose: () => void,
  attached = true,
) => {
  useOutsideClick(ref, onClose, attached);
  useEscapeKeydown(ref, onClose, attached);
};
