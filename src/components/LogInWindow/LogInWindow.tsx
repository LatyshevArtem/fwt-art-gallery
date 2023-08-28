import { ChangeEventHandler, FC, useState } from 'react';
import { useThemeContext } from '@hooks/useThemeContext';
import AuthWindow from '@components/AuthWindow';
import AuthWindowLink from '@components/AuthWindowLink';

type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

interface LogInWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogInWindow: FC<LogInWindowProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isDarkTheme } = useThemeContext();

  const handleEmailChange: InputChangeEventHandler = (evt) => setEmail(evt.target.value);
  const handlePasswordChange: InputChangeEventHandler = (evt) => setPassword(evt.target.value);

  return (
    <AuthWindow
      windowType="login"
      isDarkTheme={isDarkTheme}
      isOpen={isOpen}
      onClose={onClose}
      authFormProps={{
        email,
        onEmailChange: handleEmailChange,
        password,
        onPasswordChange: handlePasswordChange,
        onFormSubmit: () => {},
      }}
    >
      If you don&apos;t have an account yet, please{' '}
      <AuthWindowLink isDarkTheme={isDarkTheme} href="signup">
        sign up
      </AuthWindowLink>
    </AuthWindow>
  );
};

export default LogInWindow;
