import { selectAuth } from '@store/features/auth/authSlice';
import { useAppSelector } from './useAppSelector';

export const useIsAuth = () => useAppSelector(selectAuth);
