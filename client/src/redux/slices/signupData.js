import { createSlice } from "@reduxjs/toolkit";

const signupDataSlice = createSlice({
  name: "signupData",
  initialState: {
    signupData: null,
  },
  reducers: {
    updateSignupData: (state, action) => {
      state.signupData = action.payload;
    },
  },
});

export const { updateSignupData } = signupDataSlice.actions;

export default signupDataSlice.reducer;
