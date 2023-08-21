import { RouteObject } from 'react-router-dom';
import ArtistPage from '@components/pages/ArtistPage';

export const artistPageRouter: RouteObject = {
  path: 'artist',
  element: <ArtistPage />,
};
