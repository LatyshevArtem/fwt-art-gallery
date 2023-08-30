import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiService } from '@api/apiService';

const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

setupListeners(store.dispatch);

export { store };
