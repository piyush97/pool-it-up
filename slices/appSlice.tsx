/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;

//   Selectors
export const selectTheme = (state: { app: { theme: any } }) => state.app.theme;

export default appSlice.reducer;
