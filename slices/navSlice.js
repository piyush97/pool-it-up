import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  date: null,
  time: null,
  passengers: 1,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducer: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

//   Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectDate = (state) => state.nav.date;
export const selectTime = (state) => state.nav.time;
export const selectPassengers = (state) => state.nav.passengers;

export default navSlice.reducer;
