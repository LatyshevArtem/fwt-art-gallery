import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { useThemeContext } from '@hooks/useThemeContext';
import { useSignupMutation } from '@api/features';
import { useSuccessAuthResponse } from '@hooks/useSuccessAuthResponse';
import AuthWindow from '@components/AuthWindow';
import AuthWindowLink from '@components/AuthWindowLink';

type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;
type FormSubmitEventHandler = FormEventHandler<HTMLFormElement>;

interface SignUpWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpWindow: FC<SignUpWindowProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isDarkTheme } = useThemeContext();
  const [signup, { isSuccess }] = useSignupMutation();

  useSuccessAuthResponse(isSuccess, onClose);

  const onEmailChange: InputChangeEventHandler = (evt) => setEmail(evt.target.value);
  const onPasswordChange: InputChangeEventHandler = (evt) => setPassword(evt.target.value);

  const onFormSubmit: FormSubmitEventHandler = (evt) => {
    evt.preventDefault();
    signup({ username: email, password });
  };

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
        onFormSubmit,
      }}
    >
      If you already have an account, please&nbsp;
      <AuthWindowLink isDarkTheme={isDarkTheme} onClick={onClose} to="?auth=login">
        log in
      </AuthWindowLink>
    </AuthWindow>
  );
};

export default SignUpWindow;
