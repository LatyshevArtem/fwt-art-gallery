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

  const onEmailChange: InputChangeEventHandler = (evt) => setEmail(evt.target.value);
  const onPasswordChange: InputChangeEventHandler = (evt) => setPassword(evt.target.value);

  return (
    <AuthWindow
      windowType="signup"
      isDarkTheme={isDarkTheme}
      isOpen={isOpen}
      onClose={onClose}
      authFormProps={{
        email,
        onEmailChange,
        password,
        onPasswordChange,
        onFormSubmit: () => {},
      }}
    >
      If you already have an account, please&nbsp;
      <AuthWindowLink isDarkTheme={isDarkTheme} to="login">
        log in
      </AuthWindowLink>
    </AuthWindow>
  );
};

export default SignUpWindow;
