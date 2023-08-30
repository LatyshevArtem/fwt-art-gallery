import { useEffect, RefObject } from 'react';

type UseEscapeKeydown = (ref: RefObject<HTMLElement>, onEscapeKeydown: () => void) => void;

const useEscapeKeydown: UseEscapeKeydown = (ref, onEscapeKeydown) => {
  useEffect(() => {
    const handleEscapePress = (evt: KeyboardEvent) => {
      if (ref.current && (evt.key === 'Escape' || evt.key === 'Esc')) {
        onEscapeKeydown();
      }
    };

    document.addEventListener('keydown', handleEscapePress);

    return () => document.removeEventListener('keydown', handleEscapePress);
  }, [ref, onEscapeKeydown]);
};

export { useEscapeKeydown };
