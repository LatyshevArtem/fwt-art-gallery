import { createContext, useContext } from 'react';

export interface IViewPaintingsWindowContext {
  artistId: string;
  setShouldAttachHandlerOutsideEventsToRootModal: { on: () => void; off: () => void };
}

export const ViewPaintingsWindowContext = createContext<IViewPaintingsWindowContext>(
  {} as IViewPaintingsWindowContext,
);

export const useViewPaintingsWindowContext = () => useContext(ViewPaintingsWindowContext);
