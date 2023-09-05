import { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useRefreshMutation } from '@api/features';
import { useSuccessAuthResponse } from '@hooks/useSuccessAuthResponse';
import { getTokensFromLocalStorage } from '@utils/token';
import { setIsAuth } from '@store/features/auth/authSlice';

interface InitializationLayerProps extends PropsWithChildren {}

const InitializationLayer: FC<InitializationLayerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [refresh, { isSuccess, isError }] = useRefreshMutation();

  useSuccessAuthResponse(isSuccess);

  useEffect(() => {
    const { accessToken, refreshToken } = getTokensFromLocalStorage();

    if (accessToken && refreshToken) {
      refresh({ refreshToken });
    } else {
      dispatch(setIsAuth(false));
    }
  }, [dispatch, refresh]);

  useEffect(() => {
    if (isError) {
      dispatch(setIsAuth(false));
    }
  }, [isError, dispatch]);

  return children as JSX.Element;
};

export default InitializationLayer;
