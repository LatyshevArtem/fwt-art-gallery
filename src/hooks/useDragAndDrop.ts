import { DragEventHandler, useState } from 'react';

const useDragAndDrop = () => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDragOver = (callback?: DragEventHandler<HTMLElement>) => {
    const handler: DragEventHandler<HTMLElement> = (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (!isDragActive) {
        setIsDragActive(true);
        callback?.(event);
      }
    };

    return handler;
  };

  const onDragLeave = (callback?: DragEventHandler<HTMLElement>) => {
    const handler: DragEventHandler<HTMLElement> = (event) => {
      event.stopPropagation();
      event.preventDefault();
      setIsDragActive(false);
      callback?.(event);
    };

    return handler;
  };

  const onDrop = (callback?: DragEventHandler<HTMLElement>) => {
    const handler: DragEventHandler<HTMLElement> = (event) => {
      event.stopPropagation();
      event.preventDefault();
      setIsDragActive(false);
      callback?.(event);
    };

    return handler;
  };

  return {
    isDragActive,
    setIsDragActive,
    onDragOver,
    onDragLeave,
    onDrop,
  };
};

export { useDragAndDrop };
