import { ThemeProvider } from '@providers/ThemeProvider';
import Header from '@components/layout/Header';
import './scss/index.scss';

const App = () => {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
};

export default App;
