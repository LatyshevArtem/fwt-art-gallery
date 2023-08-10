import Header from '@components/layout/Header';
import { ThemeProvider } from '../../providers/ThemeProvider';
import './scss/index.scss';

const App = () => {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
};

export default App;
