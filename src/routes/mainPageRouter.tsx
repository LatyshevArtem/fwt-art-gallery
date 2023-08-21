import { RouteObject } from 'react-router-dom';
import MainPage from '@components/pages/MainPage';

export const mainPageRouter: RouteObject = {
  path: '/',
  element: <MainPage />,
};
