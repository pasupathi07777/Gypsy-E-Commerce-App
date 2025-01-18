import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Slices/auth.Slice'

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
  },
});


