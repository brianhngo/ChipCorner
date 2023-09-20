import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import landingPageSlice from './LandingPage/LandingPageSlice.js';
import singleOrder from './cart/CartPageSlice';
import CreateNewUserSlice from './CreateNewUser/CreateNewUserSlice';
import chipsSlice from './chipsSlice';
import ProfileSlice from './MyProfile/ProfileSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    landingPage: landingPageSlice,
    order: singleOrder,
    createNewUser: CreateNewUserSlice,
    chips: chipsSlice,
    profile: ProfileSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
