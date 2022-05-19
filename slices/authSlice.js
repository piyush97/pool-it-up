import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signIn: null,
  signUp: null,
  signOut: null,
  restore_token: null,
  isLoading: true,
  isSignout: false,
  userToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignUp: (state, action) => {
      state.signUp = action.payload;
    },
    setSignIn: (state, action) => {
      state.signIn = action.payload;
    },
    setSignOut: (state, action) => {
      state.signOut = action.payload;
    },
    setRestoreToken: (state, action) => {
      state.restore_token = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsSignout: (state, action) => {
      state.isSignout = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

export const {
  setSignUp,
  setSignIn,
  setSignOut,
  setRestoreToken,
  setIsLoading,
  setIsSignout,
  setUserToken,
} = authSlice.actions;

//   Selectors
export const selectSignUp = (state) => state.auth.signUp;
export const selectSignIn = (state) => state.auth.signIn;
export const selectSignOut = (state) => state.auth.signOut;
export const selectRestoreToken = (state) => state.auth.restore_token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsSignout = (state) => state.auth.isSignout;
export const selectUserToken = (state) => state.auth.userToken;

export default authSlice.reducer;
