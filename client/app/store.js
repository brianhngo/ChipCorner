import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import landingPageSlice from './LandingPageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    landingPage: landingPageSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
