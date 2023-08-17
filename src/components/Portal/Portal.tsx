import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps extends PropsWithChildren {
  key?: null | string;
}

const Portal: FC<PortalProps> = ({ children, key }) => {
  return createPortal(children, document.body, key);
};

export default Portal;
