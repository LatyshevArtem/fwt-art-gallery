import { configureStore } from '@reduxjs/toolkit';
import artistsReducer from '../features/artistsSlice';

const store = configureStore({
  reducer: {
    artists: artistsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
