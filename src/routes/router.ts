import { createBrowserRouter } from 'react-router-dom';
import { mainPageRouter } from './mainPageRouter';
import { artistPageRouter } from './artistPageRouter';

export const router = createBrowserRouter([mainPageRouter, artistPageRouter]);
