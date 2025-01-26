import { configureStore } from '@reduxjs/toolkit'
import  loginSlice  from '../slices/loginSlice'
import  signupSlice  from '../slices/signupSlice'
import  otpSlice  from '../slices/otpSlice'
import  productSlice  from '../slices/productsSlice'
import categorySlice from '../slices/categorySlice';
import productsSlice from '../slices/productsSlice';
import cartSlices from '../slices/cartSlice';
import wishlistSlice from '../slices/wishlistSlice';
import profileSlice from '../slices/profileSlice';
import addressSlice from '../slices/addressSlice';

 



export const store = configureStore({
  reducer: {
    loginReducer: loginSlice,
    signupReducer: signupSlice,
    otpReducer: otpSlice,
    productReducer: productSlice,
    categoryReducer: categorySlice,
    productsReducer: productsSlice,
    cartReducer: cartSlices,
    wishlistReducer: wishlistSlice,
    profileReducer: profileSlice,
    addressReducer: addressSlice,
  },
});