import MainPage from '@components/pages/MainPage';
import { ThemeProvider } from '../../providers/ThemeProvider';
import './scss/index.scss';

const App = () => {
  return (
    <ThemeProvider>
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
