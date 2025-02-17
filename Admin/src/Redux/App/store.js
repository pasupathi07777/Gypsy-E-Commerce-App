import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Slices/auth.Slice'
import userSlice from '../Slices/user.Slice'
import confirmationReducer from '../Slices/confirmationSlice'
import productsReducer from "../Slices/product.Slice";
import categoryReducer from "../Slices/category.Slice";
import orderReducer from "../Slices/order.slice";
import countReducer from "../Slices/count.slice";
import bannerReducer from "../Slices/banner.Slice";

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    userReducer: userSlice,
    confirmationReducer,
    productsReducer,
    categoryReducer,
    orderReducer,
    countReducer,
    bannerReducer
  },
});


