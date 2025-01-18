import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Slices/auth.Slice'
import userSlice from '../Slices/user.Slice'

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    userReducer:userSlice
  },
});


