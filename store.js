import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import navReducer from './slices/navSlice';

const store = configureStore({
  reducer: {
    nav: navReducer,
    auth: authReducer,
  },
});
export default store;
