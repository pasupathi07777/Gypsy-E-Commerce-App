import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Slices/auth.Slice'
import userSlice from '../Slices/user.Slice'
import confirmationReducer from '../Slices/confirmationSlice'
import productsReducer from "../Slices/product.Slice";

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    userReducer: userSlice,
    confirmationReducer,
    productsReducer,
  },
});


