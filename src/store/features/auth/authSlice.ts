import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

interface AuthState {
  isAuth: boolean | null;
}

const initialState: AuthState = {
  isAuth: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth.isAuth;
export const { setIsAuth } = authSlice.actions;
export default authSlice.reducer;
