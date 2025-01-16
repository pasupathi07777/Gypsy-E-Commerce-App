import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../utils/axios';
import {outProducts} from '../data/Products';

export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async (data, thunkAPI) => {
    const {otpCode, verfiyEmail} = data;
    try {
      const response = await axiosInstance.post(`auth/verifyOTP`, {
        otp: otpCode,
        email: verfiyEmail,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || 'Something went wrong',
      );
    }
  },
);
export const procuctSlice = createSlice({
  name: 'product',
  initialState: {
    ourProducts: outProducts, // Original list
    filteredProducts: outProducts, // Filtered list (initially equal to original)
    currentViewProduce: null,
  },
  reducers: {
    filterProductsByName: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === '') {
        state.filteredProducts = state.ourProducts; // Restore original data when search is empty
      } else {
        const filtered = state.ourProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm),
        );
        state.filteredProducts = filtered;
      }
    },
    findProduct: (state, action) => {
      const searchTerm = action.payload;
      const filtered = state.ourProducts.find(
        product => product.id === searchTerm,
      );
      state.currentViewProduce = filtered;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.debug('OTP Verified:', action.payload);
        state.otp = ['', '', '', '', ''];
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.OtpErrors = action.payload.error.error || 'Failed to verify OTP';
        console.error('OTP verification error:', action.payload.error.error);
      });
  },
});

export const {findProduct, filterProductsByName} = procuctSlice.actions;

export const productState = state => state.productReducer;
export default procuctSlice.reducer;
