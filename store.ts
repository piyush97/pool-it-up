import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import appReducer from './slices/appSlice';
import navReducer from './slices/navSlice';

const middleWares = [logger];

const store = configureStore({
  reducer: {
    nav: navReducer,
    app: appReducer,
  },
  middleware: middleWares,
});
export default store;
