import { ChangeEventHandler, FC, useState } from 'react';
import { useThemeContext } from '@hooks/useThemeContext';
import AuthWindow from '@components/AuthWindow';
import AuthWindowLink from '@components/AuthWindowLink';

type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

interface SignUpWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpWindow: FC<SignUpWindowProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isDarkTheme } = useThemeContext();

  const handleEmailChange: InputChangeEventHandler = (evt) => setEmail(evt.target.value);
  const handlePasswordChange: InputChangeEventHandler = (evt) => setPassword(evt.target.value);

  return (
    <AuthWindow
      windowType="signup"
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
      If you already have an account, please{' '}
      <AuthWindowLink isDarkTheme={isDarkTheme} href="login">
        log in
      </AuthWindowLink>
    </AuthWindow>
  );
};

export default SignUpWindow;
