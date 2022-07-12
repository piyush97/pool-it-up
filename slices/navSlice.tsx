/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  date: new Date(),
  time: null,
  passengers: 1,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation, setDate } = navSlice.actions;

//   Selectors
export const selectOrigin = (state: { nav: { origin: any } }) => state.nav.origin;
export const selectDestination = (state: { nav: { destination: any } }) => state.nav.destination;
export const selectTravelTimeInformation = (state: { nav: { travelTimeInformation: any } }) =>
  state.nav.travelTimeInformation;
export const selectDate = (state: { nav: { date: any } }) => state.nav.date;
export const selectTime = (state: { nav: { time: any } }) => state.nav.time;
export const selectPassengers = (state: { nav: { passengers: any } }) => state.nav.passengers;

export default navSlice.reducer;
