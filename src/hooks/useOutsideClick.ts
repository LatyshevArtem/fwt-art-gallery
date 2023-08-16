import { useEffect, RefObject } from 'react';

type UseOutsideClick = (ref: RefObject<HTMLElement>, onClick: () => void) => void;

const useOutsideClick: UseOutsideClick = (ref, onClick) => {
  useEffect(() => {
    const handler = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        onClick();
      }
    };

    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [ref, onClick]);
};

export { useOutsideClick };
