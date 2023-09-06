import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { useThemeContext } from '@hooks/useThemeContext';
import { useLoginMutation } from '@api/features';
import { useSuccessAuthResponse } from '@hooks/useSuccessAuthResponse';
import AuthWindow from '@components/AuthWindow';
import AuthWindowLink from '@components/AuthWindowLink';

type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;
type FormSubmitEventHandler = FormEventHandler<HTMLFormElement>;

interface LogInWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogInWindow: FC<LogInWindowProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isDarkTheme } = useThemeContext();
  const [login, { isSuccess }] = useLoginMutation();

  useSuccessAuthResponse(isSuccess, onClose);

  const onEmailChange: InputChangeEventHandler = (event) => setEmail(event.target.value);
  const onPasswordChange: InputChangeEventHandler = (event) => setPassword(event.target.value);

  const onFormSubmit: FormSubmitEventHandler = (event) => {
    event.preventDefault();
    login({ username: email, password });
  };

  return (
    <AuthWindow
      windowType="login"
      isDarkTheme={isDarkTheme}
      isOpen={isOpen}
      onClose={onClose}
      authFormProps={{
        email,
        onEmailChange,
        password,
        onPasswordChange,
        onFormSubmit,
      }}
    >
      If you don&apos;t have an account yet, please&nbsp;
      <AuthWindowLink isDarkTheme={isDarkTheme} to="?auth=signup">
        sign up
      </AuthWindowLink>
    </AuthWindow>
  );
};

export default LogInWindow;
