import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import landingPageSlice from './LandingPageSlice';
import CreateNewUserSlice from './CreateNewUserSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    landingPage: landingPageSlice,
    createNewUser: CreateNewUserSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
