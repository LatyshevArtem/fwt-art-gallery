import { Provider } from 'react-redux';
import MainPage from '@components/pages/MainPage';
import { store } from '../../store/store';
import { ThemeProvider } from '../../providers/ThemeProvider';
import './scss/index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
