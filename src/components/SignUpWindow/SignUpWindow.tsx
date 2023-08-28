import { FC } from 'react';
import { useThemeContext } from '@hooks/useThemeContext';
import AuthWindow from '@components/AuthWindow';
import AuthWindowLink from '@components/AuthWindowLink';

interface SignUpWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpWindow: FC<SignUpWindowProps> = ({ isOpen, onClose }) => {
  const { isDarkTheme } = useThemeContext();

  return (
    <AuthWindow windowType="signup" isDarkTheme={isDarkTheme} isOpen={isOpen} onClose={onClose}>
      If you already have an account, please{' '}
      <AuthWindowLink isDarkTheme={isDarkTheme} href="login">
        log in
      </AuthWindowLink>
    </AuthWindow>
  );
};

export default SignUpWindow;
