import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { artistApi } from '@api/features';

const store = configureStore({
  reducer: {
    [artistApi.reducerPath]: artistApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(artistApi.middleware),
});

setupListeners(store.dispatch);

export { store };
