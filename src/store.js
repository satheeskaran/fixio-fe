import { configureStore } from '@reduxjs/toolkit'
import reportsReducer from './slices/reportsSlice'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reportsReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk]
});

export const persistor = persistStore(store);