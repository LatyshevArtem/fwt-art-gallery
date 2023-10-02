import { useEffect, RefObject } from 'react';

type UseEscapeKeydown = (
  ref: RefObject<HTMLElement>,
  onEscapeKeydown: () => void,
  attached?: boolean,
) => void;

const useEscapeKeydown: UseEscapeKeydown = (ref, onEscapeKeydown, attached = true) => {
  useEffect(() => {
    if (!attached) return undefined;

    const handleEscapePress = (evt: KeyboardEvent) => {
      if (ref.current && (evt.key === 'Escape' || evt.key === 'Esc')) {
        onEscapeKeydown();
      }
    };

    document.addEventListener('keydown', handleEscapePress);

    return () => document.removeEventListener('keydown', handleEscapePress);
  }, [ref, onEscapeKeydown, attached]);
};

export { useEscapeKeydown };
