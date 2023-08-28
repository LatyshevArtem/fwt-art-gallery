import { FC } from 'react';
import { useThemeContext } from '@hooks/useThemeContext';
import AuthWindow from '@components/AuthWindow';
import AuthWindowLink from '@components/AuthWindowLink';

interface LogInWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogInWindow: FC<LogInWindowProps> = ({ isOpen, onClose }) => {
  const { isDarkTheme } = useThemeContext();

  return (
    <AuthWindow windowType="login" isDarkTheme={isDarkTheme} isOpen={isOpen} onClose={onClose}>
      If you don&apos;t have an account yet, please{' '}
      <AuthWindowLink isDarkTheme={isDarkTheme} href="signup">
        sign up
      </AuthWindowLink>
    </AuthWindow>
  );
};

export default LogInWindow;
