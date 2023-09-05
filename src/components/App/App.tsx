import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '@store/store';
import { ThemeProvider } from '@providers/ThemeProvider';
import { router } from '@routes/router';
import InitializationLayer from './InitializationLayer';
import './scss/index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <InitializationLayer>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </InitializationLayer>
    </Provider>
  );
};

export default App;
