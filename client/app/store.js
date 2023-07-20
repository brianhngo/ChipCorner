import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import LandingPageSlice from './LandingPageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    landingPage: LandingPageSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
