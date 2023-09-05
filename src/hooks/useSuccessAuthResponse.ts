import { useEffect } from 'react';
import { setIsAuth } from '@store/features/auth/authSlice';
import { useAppDispatch } from './useAppDispatch';

type UseSuccessAuthResponse = (isSuccess: boolean, onSuccess: () => void) => void;

export const useSuccessAuthResponse: UseSuccessAuthResponse = (isSuccess, onSuccess) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsAuth(true));
      onSuccess();
    }
  }, [isSuccess, dispatch, onSuccess]);
};
