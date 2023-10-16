import { ButtonHTMLAttributes, FC } from 'react';
import { removeTokensFromLocalStorage } from '@utils/token';
import { useThemeContext } from '@hooks/useThemeContext';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { setIsAuth } from '@store/features/auth/authSlice';
import TextButton from '@components/TextButton';

type JSXButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface LogoutButtonProps extends Omit<JSXButtonProps, 'onClick'> {}

const LogoutButton: FC<LogoutButtonProps> = ({ children, ...props }) => {
  const { isDarkTheme } = useThemeContext();
  const dispatch = useAppDispatch();

  const handleLogoutButtonClick = () => {
    removeTokensFromLocalStorage();
    dispatch(setIsAuth(false));
  };

  return (
    <TextButton isDarkTheme={isDarkTheme} onClick={handleLogoutButtonClick} {...props} isUnderlined>
      {children || 'Log out'}
    </TextButton>
  );
};

export default LogoutButton;
