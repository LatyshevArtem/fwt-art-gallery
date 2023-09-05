import { useEffect } from 'react';
import { setIsAuth } from '@store/features/auth/authSlice';
import { useAppDispatch } from './useAppDispatch';

export const useSuccessAuthResponse = (isSuccess: boolean, onSuccess?: () => void) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsAuth(true));
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [isSuccess, dispatch, onSuccess]);
};
