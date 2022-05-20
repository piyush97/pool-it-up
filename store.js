import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import navReducer from './slices/navSlice';

const store = configureStore({
  reducer: {
    nav: navReducer,
    auth: authReducer,
    app: appReducer,
  },
});
export default store;
