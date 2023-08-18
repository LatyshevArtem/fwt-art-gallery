import { configureStore } from '@reduxjs/toolkit';
import artistsReducer from '../features/artistsSlice';
import artistByIdReducer from '../features/artistByIdSlice';

const store = configureStore({
  reducer: {
    artists: artistsReducer,
    artistById: artistByIdReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
