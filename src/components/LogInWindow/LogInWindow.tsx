import { FC } from 'react';
import { useLoginMutation } from '@api/features';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setTokensToLocalStorage } from '@utils/token';
import { setIsAuth } from '@store/features/auth/authSlice';
import AuthWindow from '@components/AuthWindow';

interface LogInWindowProps {
  onChangeWindowType: () => void;
  onClose: () => void;
}

const LogInWindow: FC<LogInWindowProps> = ({ onChangeWindowType, onClose }) => {
  const [login, { isSuccess, data }] = useLoginMutation();
  const dispatch = useAppDispatch();

  if (isSuccess && data) {
    const { accessToken, refreshToken } = data;
    setTokensToLocalStorage(accessToken, refreshToken);
    dispatch(setIsAuth(true));
    onClose();
  }

  const handleSubmit = (username: string, password: string) => login({ username, password });

  return (
    <AuthWindow
      windowType="login"
      onChangeWindowType={onChangeWindowType}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default LogInWindow;
