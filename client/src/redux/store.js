import { configureStore } from "@reduxjs/toolkit";
import signupDataReducer from "./slices/signupData";
import userSliceReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    signupData: signupDataReducer,
    user: userSliceReducer,
  },
});
