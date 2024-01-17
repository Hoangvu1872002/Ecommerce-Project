import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlide from './products/productSlide';
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import userSlide from './users/userSlide';

const commonConfig = {
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlide,
    user: persistReducer(userConfig, userSlide)
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export const persistor = persistStore(store)