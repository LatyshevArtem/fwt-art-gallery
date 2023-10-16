import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from '@api/apiService';
import auth from './features/auth/authSlice';
import artistsFilters from './features/artistsFilters/artistsFiltersSlice';

const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    auth,
    artistsFilters,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
