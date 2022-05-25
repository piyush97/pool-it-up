import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import navReducer from './slices/navSlice';

const store = configureStore({
  reducer: {
    nav: navReducer,
    app: appReducer,
  },
});
export default store;
