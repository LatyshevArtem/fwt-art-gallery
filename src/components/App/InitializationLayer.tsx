import { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useRefreshMutation } from '@api/features';
import { getTokensFromLocalStorage, setTokensToLocalStorage } from '@utils/token';
import { setIsAuth } from '@store/features/auth/authSlice';

interface InitializationLayerProps extends PropsWithChildren {}

const InitializationLayer: FC<InitializationLayerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [refresh, { isSuccess, isError, data }] = useRefreshMutation();

  useEffect(() => {
    const { accessToken, refreshToken } = getTokensFromLocalStorage();

    if (accessToken && refreshToken) {
      refresh({ refreshToken });
    } else {
      dispatch(setIsAuth(false));
    }
  }, [dispatch, refresh]);

  useEffect(() => {
    if (isSuccess && data) {
      const { accessToken, refreshToken } = data;
      setTokensToLocalStorage(accessToken, refreshToken);
      dispatch(setIsAuth(true));
    } else if (isError) {
      dispatch(setIsAuth(false));
    }
  }, [isSuccess, isError, data, dispatch]);

  return children as JSX.Element;
};

export default InitializationLayer;
