import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from '../../routes/router';
import { store } from '../../store/store';
import { ThemeProvider } from '../../providers/ThemeProvider';
import './scss/index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
