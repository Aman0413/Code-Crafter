import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosclient";

//get my profile
export const getMyProfile = createAsyncThunk("getMyProfile", async () => {
  const res = await axios.get("/user/myProfile");
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  extraReducers: {
    [getMyProfile.fulfilled]: (state, action) => {
      state.user = action.payload.data;
    },
    [getMyProfile.rejected]: (state, action) => {
      state.user = null;
    },
    [getMyProfile.pending]: (state, action) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
